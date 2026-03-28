const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "s",
  "strike",
  "sub",
  "sup",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "span",
  "small",
  "mark",
  "del",
  "ins",
  "abbr",
  "code",
  "pre",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(["href", "title"]),
  abbr: new Set(["title"]),
};

const SELF_CLOSING_TAGS = new Set(["br"]);

/**
 * Strips all HTML tags except basic formatting tags.
 * Removes all attributes except explicitly allowed ones.
 * This is a simple server-side sanitizer — not a full HTML parser.
 */
export function sanitizeHtml(html: string): string {
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)?\/?>/g, (match, tag: string, attrs: string) => {
    const lowerTag = tag.toLowerCase();

    if (!ALLOWED_TAGS.has(lowerTag)) {
      return "";
    }

    const isClosing = match.startsWith("</");
    if (isClosing) {
      return `</${lowerTag}>`;
    }

    const isSelfClosing = SELF_CLOSING_TAGS.has(lowerTag);
    const allowedAttrs = ALLOWED_ATTRIBUTES[lowerTag];
    let sanitizedAttrs = "";

    if (allowedAttrs && attrs) {
      const attrMatches = attrs.matchAll(/([a-zA-Z-]+)\s*=\s*"([^"]*)"/g);
      for (const attrMatch of attrMatches) {
        const attrName = attrMatch[1].toLowerCase();
        const attrValue = attrMatch[2];

        if (!allowedAttrs.has(attrName)) continue;

        // Block javascript: URLs in href
        if (attrName === "href" && /^\s*javascript:/i.test(attrValue)) continue;

        sanitizedAttrs += ` ${attrName}="${attrValue}"`;
      }

      // Force rel="noopener noreferrer" and target="_blank" on links
      if (lowerTag === "a") {
        sanitizedAttrs += ` rel="noopener noreferrer" target="_blank"`;
      }
    }

    return isSelfClosing
      ? `<${lowerTag}${sanitizedAttrs} />`
      : `<${lowerTag}${sanitizedAttrs}>`;
  });
}
