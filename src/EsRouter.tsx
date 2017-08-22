import * as React from "react"
import {
  Route as RRoute,
  RouteProps,
  Link as LLink,
  LinkProps,
  NavLink as NNavLink,
  NavLinkProps,
  Redirect as RRedirect
} from "react-router-dom"
import { RedirectProps } from "react-router"

export * from "react-router-dom"

export function Route(props: RouteProps) {
  if (props && props.path) {
    return <RRoute {...props} path={getPath(props.path)} />
  }
  return <RRoute {...props} />
}

export function Redirect(props: RedirectProps) {
  if (typeof props.to === "string") {
    return <RRedirect {...props} to={getPath(props.to)} />
  } else if (typeof props.to === "object" && props.to.pathname) {
    const newTo = {
      ...props.to,
      pathname: getPath(props.to.pathname)
    }
    return <RRedirect {...props} to={newTo} />
  }
  return <RRedirect {...props} />
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

export function NavLink(props: NavLinkProps) {
  if (typeof props.to === "string") {
    return <NNavLink {...props} to={getPath(props.to)} />
  } else if (typeof props.to === "object" && props.to.pathname) {
    const newTo = {
      ...props.to,
      pathname: getPath(props.to.pathname)
    }
    return <NNavLink {...props} to={newTo} />
  }
  return <NNavLink {...props} />
}

function getPath(path: string) {
  return ENV_PREFIX + path
}
