import * as React from "react"
import {
  Route as RRoute,
  RouteProps,
  Link as LLink,
  LinkProps
} from "react-router-dom"

export function Route(props: RouteProps) {
  if (props && props.path) {
    return <RRoute {...props} path={getPath(props.path)} />
  }
  return <RRoute {...props} />
}

export function Link(props: LinkProps) {
  if (typeof props.to === "string") {
    return <LLink {...props} to={getPath(props.to)} />
  } else if (typeof props.to === "object" && props.to.pathname) {
    const newTo = {
      ...props.to,
      pathname: getPath(props.to.pathname)
    }
    return <LLink {...props} to={newTo} />
  }
  return <LLink {...props} />
}

function getPath(path: string) {
  return ENV_PREFIX + path
}
