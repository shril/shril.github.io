export type OpenSourceItem = {
  name: string;
  href?: string;
  role: string;
  body: string;
};

export const contributions: OpenSourceItem[] = [
  {
    name: "Hardwood",
    role: "Contributor",
    body: "A minimal-dependency Java implementation of Apache Parquet. I authored dictionary-space predicate evaluation, which evaluates a predicate once per column-chunk dictionary and answers rows by index comparison instead of decoding values (accepted, landing next release). I also restored Bloom filter pruning on FLOAT and DOUBLE columns, and packed the dive TUI preview by content width.",
  },
  {
    name: "Koalas (Databricks)",
    href: "https://github.com/databricks/koalas",
    role: "Contributor",
    body: "Contributed merged DataFrame API implementations — replace, cache, to_records, and to_excel — to Koalas, which was later merged into Apache Spark as the pandas API on Spark.",
  },
];

export const projects: OpenSourceItem[] = [
  {
    name: "thanosDB",
    href: "https://github.com/shril/thanosdb",
    role: "Author",
    body: "An open-source key-value store written in Python, built on the standard library's own primitives.",
  },
  {
    name: "CubicEquationSolver",
    href: "https://github.com/shril/CubicEquationSolver",
    role: "Author",
    body: "A small Python library for finding the roots of a cubic equation, used widely enough to pick up a few dozen stars.",
  },
];
