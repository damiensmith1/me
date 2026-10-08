import { Fragment } from "react";
import { aboutContent } from "@/lib/content";
import { Row, RowTitle } from "@/components/ui/row";

export function About() {
  return (
    <Row id="about" rail="About">
      <RowTitle>{aboutContent.title}</RowTitle>

      {aboutContent.paragraphs.map((paragraph, i) => (
        <Fragment key={i}>
          {i === aboutContent.pullQuoteAfter ? (
            <p className="my-8 border-l-2 border-accent pl-4 text-[1.35rem] text-muted italic">
              {aboutContent.pullQuote}
            </p>
          ) : null}
          <p className={i === 0 ? "drop-cap mb-5" : "mb-5"}>{paragraph}</p>
        </Fragment>
      ))}

      <ol className="mt-10">
        {aboutContent.experience.map((item) => (
          <li
            key={`${item.when}-${item.org}`}
            className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-5"
          >
            <span className="font-mono text-xs leading-[1.9] text-muted tabular-nums">
              {item.when}
            </span>
            <span className="font-display text-base leading-snug font-medium">
              {item.role}
              <span className="block font-serif text-base font-normal text-muted">
                {item.org}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </Row>
  );
}
