import axios from 'axios';


const OTEL_METRICS_EXPORTER_OTLP_PUBLIC_ENDPOINT = 'https://my-deployment-380010.cloud.elastic.co/api/apm/v1/metrics';
const PRODUCT_METRIC_PREFIX = 'product-metric';

export enum OtelAppProductMetric {
  // User opened first page without issues
  USED_CREATED_TASK = 'used_created_task',

  // User opened quiz without issuese
  USER_OPENED_QUIZ = 'user_opened_quiz',

  // User completed quiz without issues,
  USER_COMPLETED_QUIZ = 'user_completed_quiz',

  // User opened payment popup without issues, all forms of payment popups are ready to interact with
  USER_OPENED_PAYMENT_POPUP = 'user_opened_payment_popup',

  // User purchased after main purchase subscription
  USER_BOUGHT_MAIN_PLAN = 'user_bought_main_plan',

  // User successfully signed up
  USER_SIGNED_UP = 'user_signed_up', // User successfully signed up

  // User purchased subscription upsell after main purchase
  USER_BOUGHT_SUBSCRIPTION_UPSELL = 'user_bought_subscription_upsell',

  // User purchased subscription upsell after main purchase
  USER_BOUGHT_PREMIUM_PACK_UPSELL = 'user_bought_premium_pack_upsell',

  // User purchased one-time upsell after main purchase
  USER_BOUGHT_ONE_TIME_UPSELL = 'user_bought_one_time_upsell',

  // User opened payment popup without issues, all forms of payment popups are ready to interact with
  USER_BOUGHT_ECOMM = 'user_bought_ecomm',
}

const METRIC_NAME_DESCRIPTION_MAP: Record<OtelAppProductMetric, string> = {
  [OtelAppProductMetric.USED_CREATED_TASK]: 'User created task',
  [OtelAppProductMetric.USER_OPENED_QUIZ]: 'User opened quiz',
  [OtelAppProductMetric.USER_COMPLETED_QUIZ]: 'User completed quiz and created questionnaire',
  [OtelAppProductMetric.USER_OPENED_PAYMENT_POPUP]:
    'Request for creating main order was successful and payment popup was opened',
  [OtelAppProductMetric.USER_BOUGHT_MAIN_PLAN]: 'User bought main plan',
  [OtelAppProductMetric.USER_SIGNED_UP]: 'User signed up',
  [OtelAppProductMetric.USER_BOUGHT_SUBSCRIPTION_UPSELL]:
    'Request for creating subscription upsell token payment was successful',
  [OtelAppProductMetric.USER_BOUGHT_PREMIUM_PACK_UPSELL]:
    'Request for creating premium pack upsell token payment was successful',
  [OtelAppProductMetric.USER_BOUGHT_ONE_TIME_UPSELL]:
    'Request for creating one time upsell token payment was successful',
  [OtelAppProductMetric.USER_BOUGHT_ECOMM]: 'Request for creating e comm upsell token payment was successful',
};

export enum OtelAppProductAttribute {
  COUNTRY = 'country',
  DOMAIN = 'domain',
  TRAFFIC_SOURCE = 'traffic_source',
  PLATFORM = 'platform',
  BROWSER = 'browser',
  FLOW = 'flow',
  LOCALE = 'locale',
  PAYMENT_METHOD = 'payment_method',
  PAYMENT_PROVIDER = 'payment_provider',
}

enum OtelAggregationTemporality {
  DELTA = 'AGGREGATION_TEMPORALITY_DELTA',
}

enum OtelMetricUnit {
  COUNT = 'count',
}

type TPrepareOTELCustomMetricPayloadParams = {
  metricName: OtelAppProductMetric;
  metricDescription: string;
  attributes: Partial<Record<OtelAppProductAttribute, string | undefined>>;
};

type TOtelCustomMetricPayloadAttributeValue = {
  stringValue: string;
};

type TOtelCustomMetricPayloadAttribute = {
  key: string;
  value: TOtelCustomMetricPayloadAttributeValue;
};

type TOtelCustomMetricPayloadDataPoint = {
  attributes: TOtelCustomMetricPayloadAttribute[];
  asInt: number;
  startTimeUnixNano: number;
  timeUnixNano: number;
};

type TOtelCustomMetricPayloadMetricSum = {
  dataPoints: TOtelCustomMetricPayloadDataPoint[];
  aggregationTemporality: OtelAggregationTemporality.DELTA;
  isMonotonic: boolean;
};

type TOtelCustomMetricPayloadMetric = {
  name: string;
  description: string;
  unit: OtelMetricUnit.COUNT;
  sum: TOtelCustomMetricPayloadMetricSum;
};

type TOtelCustomMetricPayloadScopeMetric = {
  metrics: TOtelCustomMetricPayloadMetric[];
};

type TOtelCustomMetricPayloadResourceMetric = {
  scopeMetrics: TOtelCustomMetricPayloadScopeMetric[];
  resource: {
    attributes: TOtelCustomMetricPayloadAttribute[];
  };
};

type TPrepareOTELCustomMetricReturn = {
  resourceMetrics: TOtelCustomMetricPayloadResourceMetric[];
};

function prepareOTELCustomMetricPayload({
  metricName,
  metricDescription,
  attributes,
}: TPrepareOTELCustomMetricPayloadParams): TPrepareOTELCustomMetricReturn {
  const currentTimestamp = Date.now() * 1_000_000; // Current time in nanoseconds

  const customAttributesEntries = Object.entries(attributes);

  // Extend attributes array with custom attributes
  const customAttributes = customAttributesEntries.map<TOtelCustomMetricPayloadAttribute>(([key, value]) => ({
    key: `${PRODUCT_METRIC_PREFIX}.${key}`,
    value: { stringValue: value },
  }));

  const metricPayload: TPrepareOTELCustomMetricReturn = {
    resourceMetrics: [
      {
        resource: {
          attributes: [{ key: 'service.name', value: { stringValue: 'todo' } }],
        },
        scopeMetrics: [
          {
            metrics: [
              {
                name: `${PRODUCT_METRIC_PREFIX}.${'todo'}.${metricName}`,
                description: metricDescription,
                unit: OtelMetricUnit.COUNT,
                sum: {
                  dataPoints: [
                    {
                      attributes: [
                        { key: `${PRODUCT_METRIC_PREFIX}.name`, value: { stringValue: metricName } },
                        ...customAttributes,
                      ],
                      asInt: 1,
                      startTimeUnixNano: currentTimestamp,
                      timeUnixNano: currentTimestamp,
                    },
                  ],
                  aggregationTemporality: OtelAggregationTemporality.DELTA,
                  isMonotonic: true,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return metricPayload;
}

type TOTELCustomMetricPayloadParams = {
  metricName: OtelAppProductMetric;
  metricDescription?: string;
  attributes: Partial<Record<OtelAppProductAttribute, string | undefined>>;
};

export default async function reportOTELCustomMetric({
  metricName,
  metricDescription,
  attributes,
}: TOTELCustomMetricPayloadParams): Promise<void> {
  const payload = prepareOTELCustomMetricPayload({
    metricName: metricName,
    metricDescription: metricDescription || METRIC_NAME_DESCRIPTION_MAP[metricName],
    attributes,
  });

  try {
    await axios.post(OTEL_METRICS_EXPORTER_OTLP_PUBLIC_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error while sending custom metric', error);
  }
}