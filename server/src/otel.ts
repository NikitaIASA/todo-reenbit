import 'dotenv/config'; // 👈 обов’язково першим рядком

import { NodeSDK } from '@opentelemetry/sdk-node';
import {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
    ATTR_SERVICE_NAME,
    ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';


const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'todo-2232',
        [ATTR_SERVICE_VERSION]: '1.0',
    }),
    traceExporter: new OTLPTraceExporter({
        url: 'https://b40b60647c78406a9f10de5610862276.apm.us-central1.gcp.cloud.es.io:443/v1/traces',
    }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: 'https://b40b60647c78406a9f10de5610862276.apm.us-central1.gcp.cloud.es.io:443/v1/metrics',
        }),
    }),
    instrumentations: [getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-pino': {
            logHook: (span, record) => {
                // adding elastic fields
                record['trace.id'] = span.spanContext().traceId;
                record['span.id'] = span.spanContext().spanId;

                // deleting otel auto-instrumented fields to avoid duplication
                delete record['trace_id'];
                delete record['span_id'];
                delete record['trace_flags'];
            },
        },
        '@opentelemetry/instrumentation-fs': {
            enabled: false,
        },
    })],
});


sdk.start();
