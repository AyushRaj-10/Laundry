import client from 'prom-client'

client.collectDefaultMetrics()

const requestsCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
})

export const metricsMiddleware = (req, res, next) => {
  res.on("finish", () => {
    requestsCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  next();
};

export const getMetrics = async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
};