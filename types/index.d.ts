// work around to avoid compile error when using antd >= 2.12.3
declare module "rc-util/lib/Dom/addEventListener" {
  export type RcUtilEventHandler = any
}

declare const ENV_PREFIX: any
