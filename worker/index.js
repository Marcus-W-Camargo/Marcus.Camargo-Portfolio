const LEGACY_HOSTNAME = "marcuscamargo-portfolio.mcpt.workers.dev";
const CANONICAL_HOSTNAME = "marcuscamargo-portfolio.com.br";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOSTNAME}`;

const SEO_BY_PATH = {
  "/": {
    title: "Marcus Camargo | Portfólio",
    description:
      "Marcus Camargo — desenvolvimento de sites, aplicações web e mobile, integrações, automações e chatbots.",
    index: true,
  },
  "/recrutadores": {
    title: "Para recrutadores | Marcus Camargo",
    description:
      "Conheça a experiência, os projetos, as competências técnicas e a forma de trabalho de Marcus Camargo.",
    index: true,
  },
  "/privacidade": {
    title: "Política de Privacidade | Marcus Camargo",
    description:
      "Consulte a Política de Privacidade do portfólio de Marcus Camargo e saiba como os dados são tratados.",
    index: true,
  },
  "/apoie": {
    title: "Apoie | Marcus Camargo",
    description:
      "Conheça formas de apoiar os projetos independentes desenvolvidos por Marcus Camargo.",
    index: true,
  },
};

const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";

const getSeo = (pathname) => {
  const path = normalizePath(pathname);
  const page = SEO_BY_PATH[path];
  const canonicalPath = page ? path : "/";

  return {
    title: page?.title ?? "Marcus Camargo | Portfólio",
    description:
      page?.description ??
      "Projetos reais, soluções digitais e evolução técnica em desenvolvimento web e mobile.",
    robots: page?.index ? "index, follow" : "noindex, nofollow",
    canonicalUrl: `${CANONICAL_ORIGIN}${canonicalPath === "/" ? "/" : canonicalPath}`,
  };
};

const attributeHandler = (attribute, value) => ({
  element(element) {
    element.setAttribute(attribute, value);
  },
});

const titleHandler = (value) => ({
  element(element) {
    element.setInnerContent(value);
  },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === LEGACY_HOSTNAME) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOSTNAME;
      url.port = "";

      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    const seo = getSeo(url.pathname);

    return new HTMLRewriter()
      .on("title", titleHandler(seo.title))
      .on('meta[name="description"]', attributeHandler("content", seo.description))
      .on('meta[name="robots"]', attributeHandler("content", seo.robots))
      .on('link[rel="canonical"]', attributeHandler("href", seo.canonicalUrl))
      .on('meta[property="og:title"]', attributeHandler("content", seo.title))
      .on(
        'meta[property="og:description"]',
        attributeHandler("content", seo.description),
      )
      .on('meta[property="og:url"]', attributeHandler("content", seo.canonicalUrl))
      .on('meta[name="twitter:title"]', attributeHandler("content", seo.title))
      .on(
        'meta[name="twitter:description"]',
        attributeHandler("content", seo.description),
      )
      .transform(response);
  },
};
