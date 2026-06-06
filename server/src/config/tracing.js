import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const traceExporter = new OTLPTraceExporter({
  url: "http://otel-collector:4318/v1/traces", 
});

const sdk = new NodeSDK({
  traceExporter,
  serviceName: "node-app",
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();