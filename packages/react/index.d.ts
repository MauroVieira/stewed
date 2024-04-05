declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.module.scss" {
  const value: Record<string, string>;
  export default value;
}
