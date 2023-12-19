export enum FILTER_OPTIONS {
    ALL = "ALL",
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED"
}

export const FILTER_TYPES = [
    { key: FILTER_OPTIONS.ALL, label: "All" },
    { key: FILTER_OPTIONS.ACTIVE, label: "Active" },
    { key: FILTER_OPTIONS.COMPLETED, label: "Completed" }
];
