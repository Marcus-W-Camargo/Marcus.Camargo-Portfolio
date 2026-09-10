const LEGACY_HOSTNAME = "marcuscamargo-portfolio.mcpt.workers.dev";
const CANONICAL_HOSTNAME = "marcuscamargo-portfolio.com.br";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === LEGACY_HOSTNAME) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOSTNAME;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
