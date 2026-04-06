import { createComponent, isServer, ssr, ssrHydrationKey, escape, ssrAttribute, getRequestEvent, delegateEvents, ssrElement, mergeProps as mergeProps$1, Dynamic, Portal, ssrStyle, ssrStyleProperty } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/web/dist/server.js';
import { F as FileRoutes } from '../virtual/entry.mjs';
import { Suspense, createEffect, createSignal, For, createContext, onCleanup, useContext, mergeProps, splitProps, createMemo, children, getOwner, sharedConfig, createRenderEffect, on, runWithOwner, untrack, Show, createRoot, createUniqueId, startTransition, resetErrorBoundaries, batch, Switch, Match, onMount, createComponent as createComponent$1, createComputed, $TRACK, DEV } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/dist/server.js';
import 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/web/storage/dist/storage.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function createBeforeLeave() {
  let listeners2 = /* @__PURE__ */ new Set();
  function subscribe(listener) {
    listeners2.add(listener);
    return () => listeners2.delete(listener);
  }
  let ignore = false;
  function confirm(to, options) {
    if (ignore) return !(ignore = false);
    const e = {
      to,
      options,
      defaultPrevented: false,
      preventDefault: () => e.defaultPrevented = true
    };
    for (const l of listeners2) l.listener({
      ...e,
      from: l.location,
      retry: (force) => {
        force && (ignore = true);
        l.navigate(to, {
          ...options,
          resolve: false
        });
      }
    });
    return !e.defaultPrevented;
  }
  return {
    subscribe,
    confirm
  };
}
let depth;
function saveCurrentDepth() {
  if (!window.history.state || window.history.state._depth == null) {
    window.history.replaceState({
      ...window.history.state,
      _depth: window.history.length - 1
    }, "");
  }
  depth = window.history.state._depth;
}
if (!isServer) {
  saveCurrentDepth();
}
function keepDepth(state) {
  return {
    ...state,
    _depth: window.history.state && window.history.state._depth
  };
}
function notifyIfNotBlocked(notify, block) {
  let ignore = false;
  return () => {
    const prevDepth = depth;
    saveCurrentDepth();
    const delta = prevDepth == null ? null : depth - prevDepth;
    if (ignore) {
      ignore = false;
      return;
    }
    if (delta && block(delta)) {
      ignore = true;
      window.history.go(-delta);
    } else {
      notify();
    }
  };
}
const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
const mockBase = "http://sr";
function normalizePath(path, omitSlash = false) {
  const s = path.replace(trimPathRegex, "$1");
  return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
}
function resolvePath(base, path, from) {
  if (hasSchemeRegex.test(path)) {
    return void 0;
  }
  const basePath = normalizePath(base);
  const fromPath = from && normalizePath(from);
  let result = "";
  if (!fromPath || path.startsWith("/")) {
    result = basePath;
  } else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
    result = basePath + fromPath;
  } else {
    result = fromPath;
  }
  return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}
function joinPaths(from, to) {
  return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
  const params = {};
  url.searchParams.forEach((value, key) => {
    if (key in params) {
      if (Array.isArray(params[key])) params[key].push(value);
      else params[key] = [params[key], value];
    } else params[key] = value;
  });
  return params;
}
function createMatcher(path, partial, matchFilters) {
  const [pattern, splat] = path.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  const len = segments.length;
  return (location) => {
    const locSegments = location.split("/").filter(Boolean);
    const lenDiff = locSegments.length - len;
    if (lenDiff < 0 || lenDiff > 0 && splat === void 0 && !partial) {
      return null;
    }
    const match = {
      path: len ? "" : "/",
      params: {}
    };
    const matchFilter = (s) => matchFilters === void 0 ? void 0 : matchFilters[s];
    for (let i = 0; i < len; i++) {
      const segment = segments[i];
      const dynamic = segment[0] === ":";
      const locSegment = dynamic ? locSegments[i] : locSegments[i].toLowerCase();
      const key = dynamic ? segment.slice(1) : segment.toLowerCase();
      if (dynamic && matchSegment(locSegment, matchFilter(key))) {
        match.params[key] = locSegment;
      } else if (dynamic || !matchSegment(locSegment, key)) {
        return null;
      }
      match.path += `/${locSegment}`;
    }
    if (splat) {
      const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
      if (matchSegment(remainder, matchFilter(splat))) {
        match.params[splat] = remainder;
      } else {
        return null;
      }
    }
    return match;
  };
}
function matchSegment(input, filter) {
  const isEqual = (s) => s === input;
  if (filter === void 0) {
    return true;
  } else if (typeof filter === "string") {
    return isEqual(filter);
  } else if (typeof filter === "function") {
    return filter(input);
  } else if (Array.isArray(filter)) {
    return filter.some(isEqual);
  } else if (filter instanceof RegExp) {
    return filter.test(input);
  }
  return false;
}
function scoreRoute(route) {
  const [pattern, splat] = route.pattern.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === void 0 ? 0 : 1));
}
function createMemoObject(fn) {
  const map = /* @__PURE__ */ new Map();
  const owner = getOwner();
  return new Proxy({}, {
    get(_, property) {
      if (!map.has(property)) {
        runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
      }
      return map.get(property)();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    ownKeys() {
      return Reflect.ownKeys(fn());
    },
    has(_, property) {
      return property in fn();
    }
  });
}
function expandOptionals(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match) return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map((p) => p + expansion)], []);
}
const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "<A> and 'use' router primitives can be only used inside a Route.");
const useRoute = () => useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
  const route = useRoute();
  return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
  const router = useRouter();
  return createMemo(() => {
    const to_ = to();
    return to_ !== void 0 ? router.renderPath(to_) : to_;
  });
};
const useLocation = () => useRouter().location;
function createRoutes(routeDef, base = "") {
  const {
    component,
    preload,
    load,
    children: children2,
    info
  } = routeDef;
  const isLeaf = !children2 || Array.isArray(children2) && !children2.length;
  const shared = {
    key: routeDef,
    component,
    preload: preload || load,
    info
  };
  return asArray$1(routeDef.path).reduce((acc, originalPath) => {
    for (const expandedPath of expandOptionals(originalPath)) {
      const path = joinPaths(base, expandedPath);
      let pattern = isLeaf ? path : path.split("/*", 1)[0];
      pattern = pattern.split("/").map((s) => {
        return s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s);
      }).join("/");
      acc.push({
        ...shared,
        originalPath,
        pattern,
        matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
      });
    }
    return acc;
  }, []);
}
function createBranch(routes, index = 0) {
  return {
    routes,
    score: scoreRoute(routes[routes.length - 1]) * 1e4 - index,
    matcher(location) {
      const matches = [];
      for (let i = routes.length - 1; i >= 0; i--) {
        const route = routes[i];
        const match = route.matcher(location);
        if (!match) {
          return null;
        }
        matches.unshift({
          ...match,
          route
        });
      }
      return matches;
    }
  };
}
function asArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", stack = [], branches = []) {
  const routeDefs = asArray$1(routeDef);
  for (let i = 0, len = routeDefs.length; i < len; i++) {
    const def = routeDefs[i];
    if (def && typeof def === "object") {
      if (!def.hasOwnProperty("path")) def.path = "";
      const routes = createRoutes(def, base);
      for (const route of routes) {
        stack.push(route);
        const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
        if (def.children && !isEmptyArray) {
          createBranches(def.children, route.pattern, stack, branches);
        } else {
          const branch = createBranch([...stack], branches.length);
          branches.push(branch);
        }
        stack.pop();
      }
    }
  }
  return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
  for (let i = 0, len = branches.length; i < len; i++) {
    const match = branches[i].matcher(location);
    if (match) {
      return match;
    }
  }
  return [];
}
function createLocation(path, state, queryWrapper) {
  const origin = new URL(mockBase);
  const url = createMemo((prev) => {
    const path_ = path();
    try {
      return new URL(path_, origin);
    } catch (err) {
      console.error(`Invalid path ${path_}`);
      return prev;
    }
  }, origin, {
    equals: (a, b) => a.href === b.href
  });
  const pathname = createMemo(() => url().pathname);
  const search = createMemo(() => url().search, true);
  const hash = createMemo(() => url().hash);
  const key = () => "";
  const queryFn = on(search, () => extractSearchParams(url()));
  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    get hash() {
      return hash();
    },
    get state() {
      return state();
    },
    get key() {
      return key();
    },
    query: queryWrapper ? queryWrapper(queryFn) : createMemoObject(queryFn)
  };
}
let intent;
function getIntent() {
  return intent;
}
function createRouterContext(integration, branches, getContext, options = {}) {
  const {
    signal: [source, setSource],
    utils = {}
  } = integration;
  const parsePath = utils.parsePath || ((p) => p);
  const renderPath = utils.renderPath || ((p) => p);
  const beforeLeave = utils.beforeLeave || createBeforeLeave();
  const basePath = resolvePath("", options.base || "");
  if (basePath === void 0) {
    throw new Error(`${basePath} is not a valid base path`);
  } else if (basePath && !source().value) {
    setSource({
      value: basePath,
      replace: true,
      scroll: false
    });
  }
  const [isRouting, setIsRouting] = createSignal(false);
  let lastTransitionTarget;
  const transition = (newIntent, newTarget) => {
    if (newTarget.value === reference() && newTarget.state === state()) return;
    if (lastTransitionTarget === void 0) setIsRouting(true);
    intent = newIntent;
    lastTransitionTarget = newTarget;
    startTransition(() => {
      if (lastTransitionTarget !== newTarget) return;
      setReference(lastTransitionTarget.value);
      setState(lastTransitionTarget.state);
      resetErrorBoundaries();
      if (!isServer) submissions[1]((subs) => subs.filter((s) => s.pending));
    }).finally(() => {
      if (lastTransitionTarget !== newTarget) return;
      batch(() => {
        intent = void 0;
        if (newIntent === "navigate") navigateEnd(lastTransitionTarget);
        setIsRouting(false);
        lastTransitionTarget = void 0;
      });
    });
  };
  const [reference, setReference] = createSignal(source().value);
  const [state, setState] = createSignal(source().state);
  const location = createLocation(reference, state, utils.queryWrapper);
  const referrers = [];
  const submissions = createSignal(isServer ? initFromFlash() : []);
  const matches = createMemo(() => {
    if (typeof options.transformUrl === "function") {
      return getRouteMatches(branches(), options.transformUrl(location.pathname));
    }
    return getRouteMatches(branches(), location.pathname);
  });
  const buildParams = () => {
    const m = matches();
    const params2 = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params2, m[i].params);
    }
    return params2;
  };
  const params = utils.paramsWrapper ? utils.paramsWrapper(buildParams, branches) : createMemoObject(buildParams);
  const baseRoute = {
    pattern: basePath,
    path: () => basePath,
    outlet: () => null,
    resolvePath(to) {
      return resolvePath(basePath, to);
    }
  };
  createRenderEffect(on(source, (source2) => transition("native", source2), {
    defer: true
  }));
  return {
    base: baseRoute,
    location,
    params,
    isRouting,
    renderPath,
    parsePath,
    navigatorFactory,
    matches,
    beforeLeave,
    preloadRoute,
    singleFlight: options.singleFlight === void 0 ? true : options.singleFlight,
    submissions
  };
  function navigateFromRoute(route, to, options2) {
    untrack(() => {
      if (typeof to === "number") {
        if (!to) ;
        else if (utils.go) {
          utils.go(to);
        } else {
          console.warn("Router integration does not support relative routing");
        }
        return;
      }
      const queryOnly = !to || to[0] === "?";
      const {
        replace,
        resolve,
        scroll,
        state: nextState
      } = {
        replace: false,
        resolve: !queryOnly,
        scroll: true,
        ...options2
      };
      const resolvedTo = resolve ? route.resolvePath(to) : resolvePath(queryOnly && location.pathname || "", to);
      if (resolvedTo === void 0) {
        throw new Error(`Path '${to}' is not a routable path`);
      } else if (referrers.length >= MAX_REDIRECTS) {
        throw new Error("Too many redirects");
      }
      const current = reference();
      if (resolvedTo !== current || nextState !== state()) {
        if (isServer) {
          const e = getRequestEvent();
          e && (e.response = {
            status: 302,
            headers: new Headers({
              Location: resolvedTo
            })
          });
          setSource({
            value: resolvedTo,
            replace,
            scroll,
            state: nextState
          });
        } else if (beforeLeave.confirm(resolvedTo, options2)) {
          referrers.push({
            value: current,
            replace,
            scroll,
            state: state()
          });
          transition("navigate", {
            value: resolvedTo,
            state: nextState
          });
        }
      }
    });
  }
  function navigatorFactory(route) {
    route = route || useContext(RouteContextObj) || baseRoute;
    return (to, options2) => navigateFromRoute(route, to, options2);
  }
  function navigateEnd(next) {
    const first = referrers[0];
    if (first) {
      setSource({
        ...next,
        replace: first.replace,
        scroll: first.scroll
      });
      referrers.length = 0;
    }
  }
  function preloadRoute(url, preloadData) {
    const matches2 = getRouteMatches(branches(), url.pathname);
    const prevIntent = intent;
    intent = "preload";
    for (let match in matches2) {
      const {
        route,
        params: params2
      } = matches2[match];
      route.component && route.component.preload && route.component.preload();
      const {
        preload
      } = route;
      preloadData && preload && runWithOwner(getContext(), () => preload({
        params: params2,
        location: {
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          query: extractSearchParams(url),
          state: null,
          key: ""
        },
        intent: "preload"
      }));
    }
    intent = prevIntent;
  }
  function initFromFlash() {
    const e = getRequestEvent();
    return e && e.router && e.router.submission ? [e.router.submission] : [];
  }
}
function createRouteContext(router, parent, outlet, match) {
  const {
    base,
    location,
    params
  } = router;
  const {
    pattern,
    component,
    preload
  } = match().route;
  const path = createMemo(() => match().path);
  component && component.preload && component.preload();
  const data = preload ? preload({
    params,
    location,
    intent: intent || "initial"
  }) : void 0;
  const route = {
    parent,
    pattern,
    path,
    outlet: () => component ? createComponent$1(component, {
      params,
      location,
      data,
      get children() {
        return outlet();
      }
    }) : outlet(),
    resolvePath(to) {
      return resolvePath(base.path(), to, path());
    }
  };
  return route;
}
const createRouterComponent = (router) => (props) => {
  const {
    base
  } = props;
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), props.base || ""));
  let context;
  const routerState = createRouterContext(router, branches, () => context, {
    base,
    singleFlight: props.singleFlight,
    transformUrl: props.transformUrl
  });
  router.create && router.create(routerState);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return createComponent(Root, {
        routerState,
        get root() {
          return props.root;
        },
        get preload() {
          return props.rootPreload || props.rootLoad;
        },
        get children() {
          return [(context = getOwner()) && null, createComponent(Routes, {
            routerState,
            get branches() {
              return branches();
            }
          })];
        }
      });
    }
  });
};
function Root(props) {
  const location = props.routerState.location;
  const params = props.routerState.params;
  const data = createMemo(() => props.preload && untrack(() => {
    props.preload({
      params,
      location,
      intent: getIntent() || "initial"
    });
  }));
  return createComponent(Show, {
    get when() {
      return props.root;
    },
    keyed: true,
    get fallback() {
      return props.children;
    },
    children: (Root2) => createComponent(Root2, {
      params,
      location,
      get data() {
        return data();
      },
      get children() {
        return props.children;
      }
    })
  });
}
function Routes(props) {
  if (isServer) {
    const e = getRequestEvent();
    if (e && e.router && e.router.dataOnly) {
      dataOnly(e, props.routerState, props.branches);
      return;
    }
    e && ((e.router || (e.router = {})).matches || (e.router.matches = props.routerState.matches().map(({
      route,
      path,
      params
    }) => ({
      path: route.originalPath,
      pattern: route.pattern,
      match: path,
      params,
      info: route.info
    }))));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(props.routerState.matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot((dispose2) => {
          disposers[i] = dispose2;
          next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => {
            var _a;
            const routeMatches = props.routerState.matches();
            return (_a = routeMatches[i]) != null ? _a : routeMatches[0];
          });
        });
      }
    }
    disposers.splice(nextMatches.length).forEach((dispose2) => dispose2());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createOutlet(() => routeStates() && root)();
}
const createOutlet = (child) => {
  return () => createComponent(Show, {
    get when() {
      return child();
    },
    keyed: true,
    children: (child2) => createComponent(RouteContextObj.Provider, {
      value: child2,
      get children() {
        return child2.outlet();
      }
    })
  });
};
function dataOnly(event, routerState, branches) {
  const url = new URL(event.request.url);
  const prevMatches = getRouteMatches(branches, new URL(event.router.previousUrl || event.request.url).pathname);
  const matches = getRouteMatches(branches, url.pathname);
  for (let match = 0; match < matches.length; match++) {
    if (!prevMatches[match] || matches[match].route !== prevMatches[match].route) event.router.dataOnly = true;
    const {
      route,
      params
    } = matches[match];
    route.preload && route.preload({
      params,
      location: routerState.location,
      intent: "preload"
    });
  }
}
function intercept([value, setValue], get, set) {
  return [value, set ? (v) => setValue(set(v)) : setValue];
}
function createRouter(config) {
  let ignore = false;
  const wrap = (value) => typeof value === "string" ? {
    value
  } : value;
  const signal = intercept(createSignal(wrap(config.get()), {
    equals: (a, b) => a.value === b.value && a.state === b.state
  }), void 0, (next) => {
    !ignore && config.set(next);
    if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = true;
    return next;
  });
  config.init && onCleanup(config.init((value = config.get()) => {
    ignore = true;
    signal[1](wrap(value));
    ignore = false;
  }));
  return createRouterComponent({
    signal,
    create: config.create,
    utils: config.utils
  });
}
function bindEvent(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
function scrollToHash(hash, fallbackTop) {
  const el = hash && document.getElementById(hash);
  if (el) {
    el.scrollIntoView();
  } else if (fallbackTop) {
    window.scrollTo(0, 0);
  }
}
function getPath(url) {
  const u = new URL(url);
  return u.pathname + u.search;
}
function StaticRouter(props) {
  let e;
  const obj = {
    value: props.url || (e = getRequestEvent()) && getPath(e.request.url) || ""
  };
  return createRouterComponent({
    signal: [() => obj, (next) => Object.assign(obj, next)]
  })(props);
}
const actions = /* @__PURE__ */ new Map();
function setupNativeEvents(preload = true, explicitLinks = false, actionBase = "/_server", transformUrl) {
  return (router) => {
    const basePath = router.base.path();
    const navigateFromRoute = router.navigatorFactory(router.base);
    let preloadTimeout;
    let lastElement;
    function isSvg(el) {
      return el.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function handleAnchor(evt) {
      if (evt.defaultPrevented || evt.button !== 0 || evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) return;
      const a = evt.composedPath().find((el) => el instanceof Node && el.nodeName.toUpperCase() === "A");
      if (!a || explicitLinks && !a.hasAttribute("link")) return;
      const svg = isSvg(a);
      const href = svg ? a.href.baseVal : a.href;
      const target = svg ? a.target.baseVal : a.target;
      if (target || !href && !a.hasAttribute("state")) return;
      const rel = (a.getAttribute("rel") || "").split(/\s+/);
      if (a.hasAttribute("download") || rel && rel.includes("external")) return;
      const url = svg ? new URL(href, document.baseURI) : new URL(href);
      if (url.origin !== window.location.origin || basePath && url.pathname && !url.pathname.toLowerCase().startsWith(basePath.toLowerCase())) return;
      return [a, url];
    }
    function handleAnchorClick(evt) {
      const res = handleAnchor(evt);
      if (!res) return;
      const [a, url] = res;
      const to = router.parsePath(url.pathname + url.search + url.hash);
      const state = a.getAttribute("state");
      evt.preventDefault();
      navigateFromRoute(to, {
        resolve: false,
        replace: a.hasAttribute("replace"),
        scroll: !a.hasAttribute("noscroll"),
        state: state ? JSON.parse(state) : void 0
      });
    }
    function handleAnchorPreload(evt) {
      const res = handleAnchor(evt);
      if (!res) return;
      const [a, url] = res;
      transformUrl && (url.pathname = transformUrl(url.pathname));
      router.preloadRoute(url, a.getAttribute("preload") !== "false");
    }
    function handleAnchorMove(evt) {
      clearTimeout(preloadTimeout);
      const res = handleAnchor(evt);
      if (!res) return lastElement = null;
      const [a, url] = res;
      if (lastElement === a) return;
      transformUrl && (url.pathname = transformUrl(url.pathname));
      preloadTimeout = setTimeout(() => {
        router.preloadRoute(url, a.getAttribute("preload") !== "false");
        lastElement = a;
      }, 20);
    }
    function handleFormSubmit(evt) {
      if (evt.defaultPrevented) return;
      let actionRef = evt.submitter && evt.submitter.hasAttribute("formaction") ? evt.submitter.getAttribute("formaction") : evt.target.getAttribute("action");
      if (!actionRef) return;
      if (!actionRef.startsWith("https://action/")) {
        const url = new URL(actionRef, mockBase);
        actionRef = router.parsePath(url.pathname + url.search);
        if (!actionRef.startsWith(actionBase)) return;
      }
      if (evt.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const handler = actions.get(actionRef);
      if (handler) {
        evt.preventDefault();
        const data = new FormData(evt.target, evt.submitter);
        handler.call({
          r: router,
          f: evt.target
        }, evt.target.enctype === "multipart/form-data" ? data : new URLSearchParams(data));
      }
    }
    delegateEvents(["click", "submit"]);
    document.addEventListener("click", handleAnchorClick);
    if (preload) {
      document.addEventListener("mousemove", handleAnchorMove, {
        passive: true
      });
      document.addEventListener("focusin", handleAnchorPreload, {
        passive: true
      });
      document.addEventListener("touchstart", handleAnchorPreload, {
        passive: true
      });
    }
    document.addEventListener("submit", handleFormSubmit);
    onCleanup(() => {
      document.removeEventListener("click", handleAnchorClick);
      if (preload) {
        document.removeEventListener("mousemove", handleAnchorMove);
        document.removeEventListener("focusin", handleAnchorPreload);
        document.removeEventListener("touchstart", handleAnchorPreload);
      }
      document.removeEventListener("submit", handleFormSubmit);
    });
  };
}
function Router(props) {
  if (isServer) return StaticRouter(props);
  const getSource = () => {
    const url = window.location.pathname.replace(/^\/+/, "/") + window.location.search;
    const state = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return {
      value: url + window.location.hash,
      state
    };
  };
  const beforeLeave = createBeforeLeave();
  return createRouter({
    get: getSource,
    set({
      value,
      replace,
      scroll,
      state
    }) {
      if (replace) {
        window.history.replaceState(keepDepth(state), "", value);
      } else {
        window.history.pushState(state, "", value);
      }
      scrollToHash(decodeURIComponent(window.location.hash.slice(1)), scroll);
      saveCurrentDepth();
    },
    init: (notify) => bindEvent(window, "popstate", notifyIfNotBlocked(notify, (delta) => {
      if (delta) {
        return !beforeLeave.confirm(delta);
      } else {
        const s = getSource();
        return !beforeLeave.confirm(s.value, {
          state: s.state
        });
      }
    })),
    create: setupNativeEvents(props.preload, props.explicitLinks, props.actionBase, props.transformUrl),
    utils: {
      go: (delta) => window.history.go(delta),
      beforeLeave
    }
  })(props);
}
function A(props) {
  props = mergeProps({
    inactiveClass: "inactive",
    activeClass: "active"
  }, props);
  const [, rest] = splitProps(props, ["href", "state", "class", "activeClass", "inactiveClass", "end"]);
  const to = useResolvedPath(() => props.href);
  const href = useHref(to);
  const location = useLocation();
  const isActive2 = createMemo(() => {
    const to_ = to();
    if (to_ === void 0) return [false, false];
    const path = normalizePath(to_.split(/[?#]/, 1)[0]).toLowerCase();
    const loc = decodeURI(normalizePath(location.pathname).toLowerCase());
    return [props.end ? path === loc : loc.startsWith(path + "/") || loc === path, path === loc];
  });
  return ssrElement("a", mergeProps$1(rest, {
    get href() {
      return href() || props.href;
    },
    get state() {
      return JSON.stringify(props.state);
    },
    get classList() {
      return {
        ...props.class && {
          [props.class]: true
        },
        [props.inactiveClass]: !isActive2()[0],
        [props.activeClass]: isActive2()[0],
        ...rest.classList
      };
    },
    link: true,
    get ["aria-current"]() {
      return isActive2()[1] ? "page" : void 0;
    }
  }), void 0, true);
}
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var defaultAttributes_default = defaultAttributes;
var LucideContext = createContext({
  size: 24,
  color: "currentColor",
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: ""
});
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var Icon = (props) => {
  const [localProps, rest] = splitProps(props, ["color", "size", "strokeWidth", "children", "class", "name", "iconNode", "absoluteStrokeWidth"]);
  const globalProps = useContext(LucideContext);
  return ssrElement("svg", mergeProps$1(defaultAttributes_default, {
    get width() {
      var _a, _b;
      return (_b = (_a = localProps.size) != null ? _a : globalProps.size) != null ? _b : defaultAttributes_default.width;
    },
    get height() {
      var _a, _b;
      return (_b = (_a = localProps.size) != null ? _a : globalProps.size) != null ? _b : defaultAttributes_default.height;
    },
    get stroke() {
      var _a, _b;
      return (_b = (_a = localProps.color) != null ? _a : globalProps.color) != null ? _b : defaultAttributes_default.stroke;
    },
    get ["stroke-width"]() {
      var _a, _b, _c, _d, _e, _f;
      return ((_a = localProps.absoluteStrokeWidth) != null ? _a : globalProps.absoluteStrokeWidth) === true ? Number((_c = (_b = localProps.strokeWidth) != null ? _b : globalProps.strokeWidth) != null ? _c : defaultAttributes_default["stroke-width"]) * 24 / Number((_d = localProps.size) != null ? _d : globalProps.size) : Number((_f = (_e = localProps.strokeWidth) != null ? _e : globalProps.strokeWidth) != null ? _f : defaultAttributes_default["stroke-width"]);
    },
    get ["class"]() {
      return mergeClasses("lucide", "lucide-icon", globalProps.class, ...localProps.name != null ? [`lucide-${toKebabCase(toPascalCase(localProps.name))}`, `lucide-${toKebabCase(localProps.name)}`] : [], localProps.class);
    },
    get ["aria-hidden"]() {
      return !localProps.children && !hasA11yProp(rest) ? "true" : void 0;
    }
  }, rest), () => escape(createComponent(For, {
    get each() {
      return localProps.iconNode;
    },
    children: ([elementName, attrs]) => {
      return createComponent(Dynamic, mergeProps$1({
        component: elementName
      }, attrs));
    }
  })), true);
};
var Icon_default = Icon;
var iconNode$7 = [["path", {
  d: "m6 9 6 6 6-6",
  key: "qrunsl"
}]];
var ChevronDown = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$7,
  name: "chevron-down"
}));
var chevron_down_default = ChevronDown;
var iconNode$6 = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
  key: "13o1zl"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}]];
var Globe = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$6,
  name: "globe"
}));
var globe_default = Globe;
var iconNode$5 = [["path", {
  d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
  key: "mvr1a0"
}]];
var Heart = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$5,
  name: "heart"
}));
var heart_default = Heart;
var iconNode$4 = [["path", {
  d: "M4 5h16",
  key: "1tepv9"
}], ["path", {
  d: "M4 12h16",
  key: "1lakjw"
}], ["path", {
  d: "M4 19h16",
  key: "1djgab"
}]];
var Menu = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$4,
  name: "menu"
}));
var menu_default = Menu;
var iconNode$3 = [["rect", {
  width: "20",
  height: "14",
  x: "2",
  y: "3",
  rx: "2",
  key: "48i651"
}], ["line", {
  x1: "8",
  x2: "16",
  y1: "21",
  y2: "21",
  key: "1svkeh"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "17",
  y2: "21",
  key: "vw1qmm"
}]];
var Monitor = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$3,
  name: "monitor"
}));
var monitor_default = Monitor;
var iconNode$2 = [["path", {
  d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
  key: "kfwtm"
}]];
var Moon = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$2,
  name: "moon"
}));
var moon_default = Moon;
var iconNode$1 = [["circle", {
  cx: "12",
  cy: "12",
  r: "4",
  key: "4exip2"
}], ["path", {
  d: "M12 2v2",
  key: "tus03m"
}], ["path", {
  d: "M12 20v2",
  key: "1lh1kg"
}], ["path", {
  d: "m4.93 4.93 1.41 1.41",
  key: "149t6j"
}], ["path", {
  d: "m17.66 17.66 1.41 1.41",
  key: "ptbguv"
}], ["path", {
  d: "M2 12h2",
  key: "1t8f8n"
}], ["path", {
  d: "M20 12h2",
  key: "1q8mjw"
}], ["path", {
  d: "m6.34 17.66-1.41 1.41",
  key: "1m8zz5"
}], ["path", {
  d: "m19.07 4.93-1.41 1.41",
  key: "1shlcs"
}]];
var Sun = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode: iconNode$1,
  name: "sun"
}));
var sun_default = Sun;
var iconNode = [["path", {
  d: "M18 6 6 18",
  key: "1bl5f8"
}], ["path", {
  d: "m6 6 12 12",
  key: "d8bk6v"
}]];
var X = (props) => createComponent(Icon_default, mergeProps$1(props, {
  iconNode,
  name: "x"
}));
var x_default = X;
const isClient = !isServer;
const isDev = isClient && !!DEV;
const access$1 = (v) => typeof v === "function" && !v.length ? v() : v;
const asArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
function accessWith(valueOrFn, ...args) {
  return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
}
const tryOnCleanup = isDev ? (fn) => getOwner() ? onCleanup(fn) : fn : onCleanup;
function makeEventListener(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return tryOnCleanup(target.removeEventListener.bind(target, type, handler, options));
}
function createEventListener(targets, type, handler, options) {
  if (isServer) return;
  const attachListeners = () => {
    asArray(access$1(targets)).forEach((el) => {
      if (el) asArray(access$1(type)).forEach((type2) => makeEventListener(el, type2, handler, options));
    });
  };
  if (typeof targets === "function") createEffect(attachListeners);
  else createRenderEffect(attachListeners);
}
const FALLBACK = /* @__PURE__ */ Symbol("fallback");
function dispose(list) {
  for (const o of list) o.dispose();
}
function keyArray(items, keyFn, mapFn, options = {}) {
  if (isServer) {
    const itemsRef = items();
    let s = [];
    if (itemsRef && itemsRef.length) {
      for (let i = 0, len = itemsRef.length; i < len; i++) s.push(mapFn(() => itemsRef[i], () => i));
    } else if (options.fallback) s = [options.fallback()];
    return () => s;
  }
  const prev = /* @__PURE__ */ new Map();
  onCleanup(() => dispose(prev.values()));
  return () => {
    const list = items() || [];
    list[$TRACK];
    return untrack(() => {
      var _a, _b;
      if (!list.length) {
        dispose(prev.values());
        prev.clear();
        if (!options.fallback) return [];
        const fb2 = createRoot((dispose2) => {
          prev.set(FALLBACK, {
            dispose: dispose2
          });
          return options.fallback();
        });
        return [fb2];
      }
      const result = new Array(list.length);
      const fb = prev.get(FALLBACK);
      if (!prev.size || fb) {
        fb == null ? void 0 : fb.dispose();
        prev.delete(FALLBACK);
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          const key = keyFn(item, i);
          addNewItem(result, item, i, key);
        }
        return result;
      }
      const prevKeys = new Set(prev.keys());
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const key = keyFn(item, i);
        prevKeys.delete(key);
        const lookup = prev.get(key);
        if (lookup) {
          result[i] = lookup.mapped;
          (_a = lookup.setIndex) == null ? void 0 : _a.call(lookup, i);
          lookup.setItem(() => item);
        } else addNewItem(result, item, i, key);
      }
      for (const key of prevKeys) {
        (_b = prev.get(key)) == null ? void 0 : _b.dispose();
        prev.delete(key);
      }
      return result;
    });
  };
  function addNewItem(list, item, i, key) {
    createRoot((dispose2) => {
      const [getItem, setItem] = createSignal(item);
      const save = {
        setItem,
        dispose: dispose2
      };
      if (mapFn.length > 1) {
        const [index, setIndex] = createSignal(i);
        save.setIndex = setIndex;
        save.mapped = mapFn(getItem, index);
      } else save.mapped = mapFn(getItem);
      prev.set(key, save);
      list[i] = save.mapped;
    });
  }
}
function Key(props) {
  const {
    by
  } = props;
  return createMemo(keyArray(() => props.each, typeof by === "function" ? by : (v) => v[by], props.children, "fallback" in props ? {
    fallback: () => props.fallback
  } : void 0));
}
const extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
function stringStyleToObject(style) {
  const object = {};
  let match;
  while (match = extractCSSregex.exec(style)) {
    object[match[1]] = match[2];
  }
  return object;
}
function combineStyle(a, b) {
  if (typeof a === "string") {
    if (typeof b === "string") return `${a};${b}`;
    a = stringStyleToObject(a);
  } else if (typeof b === "string") {
    b = stringStyleToObject(b);
  }
  return {
    ...a,
    ...b
  };
}
function removeItemFromArray(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function isNumber(value) {
  return typeof value === "number";
}
function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isFunction(value) {
  return typeof value === "function";
}
function createGenerateId(baseId) {
  return (suffix) => `${baseId()}-${suffix}`;
}
function contains$1(parent, child) {
  if (!parent) {
    return false;
  }
  return parent === child || parent.contains(child);
}
function getActiveElement(node, activeDescendant = false) {
  const {
    activeElement
  } = getDocument(node);
  if (!(activeElement == null ? void 0 : activeElement.nodeName)) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id2 = activeElement.getAttribute("aria-activedescendant");
    if (id2) {
      const element = getDocument(activeElement).getElementById(id2);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function getWindow$1(node) {
  return getDocument(node).defaultView || window;
}
function getDocument(node) {
  return node ? node.ownerDocument || node : document;
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
var EventKey = /* @__PURE__ */ ((EventKey2) => {
  EventKey2["Escape"] = "Escape";
  EventKey2["Enter"] = "Enter";
  EventKey2["Tab"] = "Tab";
  EventKey2["Space"] = " ";
  EventKey2["ArrowDown"] = "ArrowDown";
  EventKey2["ArrowLeft"] = "ArrowLeft";
  EventKey2["ArrowRight"] = "ArrowRight";
  EventKey2["ArrowUp"] = "ArrowUp";
  EventKey2["End"] = "End";
  EventKey2["Home"] = "Home";
  EventKey2["PageDown"] = "PageDown";
  EventKey2["PageUp"] = "PageUp";
  return EventKey2;
})(EventKey || {});
function callHandler(event, handler) {
  if (handler) {
    if (isFunction(handler)) {
      handler(event);
    } else {
      handler[0](handler[1], event);
    }
  }
  return event == null ? void 0 : event.defaultPrevented;
}
function composeEventHandlers(handlers) {
  return (event) => {
    for (const handler of handlers) {
      callHandler(event, handler);
    }
  };
}
function isCtrlKey(e) {
  return e.ctrlKey && !e.metaKey;
}
function focusWithoutScrolling(element) {
  if (!element) {
    return;
  }
  if (supportsPreventScroll()) {
    element.focus({
      preventScroll: true
    });
  } else {
    const scrollableElements = getScrollableElements(element);
    element.focus();
    restoreScrollPosition(scrollableElements);
  }
}
var supportsPreventScrollCached = null;
function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      const focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e) {
    }
  }
  return supportsPreventScrollCached;
}
function getScrollableElements(element) {
  let parent = element.parentNode;
  const scrollableElements = [];
  const rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }
  return scrollableElements;
}
function restoreScrollPosition(scrollableElements) {
  for (const {
    element,
    scrollTop,
    scrollLeft
  } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
var focusableElements = ["input:not([type='hidden']):not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", "a[href]", "area[href]", "[tabindex]", "iframe", "object", "embed", "audio[controls]", "video[controls]", "[contenteditable]:not([contenteditable='false'])"];
var tabbableElements = [...focusableElements, '[tabindex]:not([tabindex="-1"]):not([disabled])'];
var FOCUSABLE_ELEMENT_SELECTOR = `${focusableElements.join(":not([hidden]),")},[tabindex]:not([disabled]):not([hidden])`;
var TABBABLE_ELEMENT_SELECTOR = tabbableElements.join(':not([hidden]):not([tabindex="-1"]),');
function getAllTabbableIn(container, includeContainer) {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTOR));
  const tabbableElements2 = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements2.unshift(container);
  }
  tabbableElements2.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(frameBody, false);
      tabbableElements2.splice(i, 1, ...allFrameTabbable);
    }
  });
  return tabbableElements2;
}
function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
function isFocusable(element) {
  return element.matches(FOCUSABLE_ELEMENT_SELECTOR) && isElementVisible(element);
}
function hasNegativeTabIndex(element) {
  const tabIndex = Number.parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isElementVisible(element, childElement) {
  return element.nodeName !== "#comment" && isStyleVisible(element) && isAttributeVisible(element, childElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }
  const {
    display,
    visibility
  } = element.style;
  let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    if (!element.ownerDocument.defaultView) {
      return isVisible;
    }
    const {
      getComputedStyle: getComputedStyle2
    } = element.ownerDocument.defaultView;
    const {
      display: computedDisplay,
      visibility: computedVisibility
    } = getComputedStyle2(element);
    isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
  }
  return isVisible;
}
function isAttributeVisible(element, childElement) {
  return !element.hasAttribute("hidden") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function getFocusableTreeWalker(root, opts, scope) {
  const selector = (opts == null ? void 0 : opts.tabbable) ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      var _a;
      if ((_a = opts == null ? void 0 : opts.from) == null ? void 0 : _a.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.matches(selector) && isElementVisible(node) && true && (!(opts == null ? void 0 : opts.accept) || opts.accept(node))) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });
  if (opts == null ? void 0 : opts.from) {
    walker.currentNode = opts.from;
  }
  return walker;
}
function noop() {
  return;
}
function mergeDefaultProps(defaultProps, props) {
  return mergeProps(defaultProps, props);
}
function setupGlobalEvents() {
  {
    return;
  }
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading") ; else {
    document.addEventListener("DOMContentLoaded", setupGlobalEvents);
  }
}
function scrollIntoView(scrollView, element) {
  const offsetX = relativeOffset(scrollView, element, "left");
  const offsetY = relativeOffset(scrollView, element, "top");
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  const maxX = x + scrollView.offsetWidth;
  const maxY = y + scrollView.offsetHeight;
  if (offsetX <= x) {
    x = offsetX;
  } else if (offsetX + width > maxX) {
    x += offsetX + width - maxX;
  }
  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }
  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
function relativeOffset(ancestor, child, axis) {
  const prop = axis === "left" ? "offsetLeft" : "offsetTop";
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor) {
      break;
    }
    if (child.offsetParent.contains(ancestor)) {
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
var visuallyHiddenStyles = {
  border: "0",
  clip: "rect(0 0 0 0)",
  "clip-path": "inset(50%)",
  height: "1px",
  margin: "0 -1px -1px 0",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  "white-space": "nowrap"
};
function buildNodes(params) {
  var _a, _b, _c;
  let index = (_a = params.startIndex) != null ? _a : 0;
  const level = (_b = params.startLevel) != null ? _b : 0;
  const nodes = [];
  const getKey = (data) => {
    var _a2;
    if (data == null) {
      return "";
    }
    const _getKey = (_a2 = params.getKey) != null ? _a2 : "key";
    const dataKey = isString(_getKey) ? data[_getKey] : _getKey(data);
    return dataKey != null ? String(dataKey) : "";
  };
  const getTextValue = (data) => {
    var _a2;
    if (data == null) {
      return "";
    }
    const _getTextValue = (_a2 = params.getTextValue) != null ? _a2 : "textValue";
    const dataTextValue = isString(_getTextValue) ? data[_getTextValue] : _getTextValue(data);
    return dataTextValue != null ? String(dataTextValue) : "";
  };
  const getDisabled = (data) => {
    var _a2, _b2;
    if (data == null) {
      return false;
    }
    const _getDisabled = (_a2 = params.getDisabled) != null ? _a2 : "disabled";
    return (_b2 = isString(_getDisabled) ? data[_getDisabled] : _getDisabled(data)) != null ? _b2 : false;
  };
  const getSectionChildren = (data) => {
    var _a2;
    if (data == null) {
      return void 0;
    }
    if (isString(params.getSectionChildren)) {
      return data[params.getSectionChildren];
    }
    return (_a2 = params.getSectionChildren) == null ? void 0 : _a2.call(params, data);
  };
  for (const data of params.dataSource) {
    if (isString(data) || isNumber(data)) {
      nodes.push({
        type: "item",
        rawValue: data,
        key: String(data),
        textValue: String(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
      continue;
    }
    if (getSectionChildren(data) != null) {
      nodes.push({
        type: "section",
        rawValue: data,
        key: "",
        // not applicable here
        textValue: "",
        // not applicable here
        disabled: false,
        // not applicable here
        level,
        index
      });
      index++;
      const sectionChildren = (_c = getSectionChildren(data)) != null ? _c : [];
      if (sectionChildren.length > 0) {
        const childNodes = buildNodes({
          dataSource: sectionChildren,
          getKey: params.getKey,
          getTextValue: params.getTextValue,
          getDisabled: params.getDisabled,
          getSectionChildren: params.getSectionChildren,
          startIndex: index,
          startLevel: level + 1
        });
        nodes.push(...childNodes);
        index += childNodes.length;
      }
    } else {
      nodes.push({
        type: "item",
        rawValue: data,
        key: getKey(data),
        textValue: getTextValue(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
    }
  }
  return nodes;
}
function createCollection(props, deps = []) {
  return createMemo(() => {
    const nodes = buildNodes({
      dataSource: access$1(props.dataSource),
      getKey: access$1(props.getKey),
      getTextValue: access$1(props.getTextValue),
      getDisabled: access$1(props.getDisabled),
      getSectionChildren: access$1(props.getSectionChildren)
    });
    for (let i = 0; i < deps.length; i++) deps[i]();
    return props.factory(nodes);
  });
}
var RTL_SCRIPTS = /* @__PURE__ */ new Set(["Avst", "Arab", "Armi", "Syrc", "Samr", "Mand", "Thaa", "Mend", "Nkoo", "Adlm", "Rohg", "Hebr"]);
var RTL_LANGS = /* @__PURE__ */ new Set(["ae", "ar", "arc", "bcc", "bqi", "ckb", "dv", "fa", "glk", "he", "ku", "mzn", "nqo", "pnb", "ps", "sd", "ug", "ur", "yi"]);
function isRTL$1(locale) {
  var _a;
  if (Intl.Locale) {
    const script = (_a = new Intl.Locale(locale).maximize().script) != null ? _a : "";
    return RTL_SCRIPTS.has(script);
  }
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}
function getReadingDirection(locale) {
  return isRTL$1(locale) ? "rtl" : "ltr";
}
function getDefaultLocale() {
  let locale = typeof navigator !== "undefined" && // @ts-ignore
  (navigator.language || navigator.userLanguage) || "en-US";
  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch (_err) {
    locale = "en-US";
  }
  return {
    locale,
    direction: getReadingDirection(locale)
  };
}
var currentLocale = getDefaultLocale();
var listeners = /* @__PURE__ */ new Set();
function updateLocale() {
  currentLocale = getDefaultLocale();
  for (const listener of listeners) {
    listener(currentLocale);
  }
}
function createDefaultLocale() {
  const defaultSSRLocale = {
    locale: "en-US",
    direction: "ltr"
  };
  const [defaultClientLocale, setDefaultClientLocale] = createSignal(currentLocale);
  const defaultLocale = createMemo(() => isServer ? defaultSSRLocale : defaultClientLocale());
  onMount(() => {
    if (listeners.size === 0) {
      window.addEventListener("languagechange", updateLocale);
    }
    listeners.add(setDefaultClientLocale);
    onCleanup(() => {
      listeners.delete(setDefaultClientLocale);
      if (listeners.size === 0) {
        window.removeEventListener("languagechange", updateLocale);
      }
    });
  });
  return {
    locale: () => defaultLocale().locale,
    direction: () => defaultLocale().direction
  };
}
var I18nContext$1 = createContext();
function useLocale() {
  const defaultLocale = createDefaultLocale();
  const context = useContext(I18nContext$1);
  return context || defaultLocale;
}
var cache$1 = /* @__PURE__ */ new Map();
function createCollator(options) {
  const {
    locale
  } = useLocale();
  const cacheKey = createMemo(() => {
    return locale() + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  });
  return createMemo(() => {
    const key = cacheKey();
    let collator;
    if (cache$1.has(key)) {
      collator = cache$1.get(key);
    }
    if (!collator) {
      collator = new Intl.Collator(locale(), options);
      cache$1.set(key, collator);
    }
    return collator;
  });
}
function createControllableSignal(props) {
  var _a;
  const [_value, _setValue] = createSignal((_a = props.defaultValue) == null ? void 0 : _a.call(props));
  const isControlled = createMemo(() => {
    var _a2;
    return ((_a2 = props.value) == null ? void 0 : _a2.call(props)) !== void 0;
  });
  const value = createMemo(() => {
    var _a2;
    return isControlled() ? (_a2 = props.value) == null ? void 0 : _a2.call(props) : _value();
  });
  const setValue = (next) => {
    untrack(() => {
      var _a2;
      const nextValue = accessWith(next, value());
      if (!Object.is(nextValue, value())) {
        if (!isControlled()) {
          _setValue(nextValue);
        }
        (_a2 = props.onChange) == null ? void 0 : _a2.call(props, nextValue);
      }
      return nextValue;
    });
  };
  return [value, setValue];
}
function createControllableBooleanSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => {
    var _a;
    return (_a = _value()) != null ? _a : false;
  };
  return [value, setValue];
}
var Selection = class _Selection extends Set {
  constructor(keys, anchorKey, currentKey) {
    super(keys);
    __publicField(this, "anchorKey");
    __publicField(this, "currentKey");
    if (keys instanceof _Selection) {
      this.anchorKey = anchorKey || keys.anchorKey;
      this.currentKey = currentKey || keys.currentKey;
    } else {
      this.anchorKey = anchorKey;
      this.currentKey = currentKey;
    }
  }
};
function createControllableSelectionSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => {
    var _a;
    return (_a = _value()) != null ? _a : new Selection();
  };
  return [value, setValue];
}
function isNonContiguousSelectionModifier(e) {
  return e.ctrlKey;
}
function isCtrlKeyPressed(e) {
  return e.ctrlKey;
}
function convertSelection(selection) {
  return new Selection(selection);
}
function isSameSelection(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}
function createMultipleSelectionState(props) {
  const mergedProps = mergeDefaultProps({
    selectionMode: "none",
    selectionBehavior: "toggle"
  }, props);
  const [isFocused, setFocused] = createSignal(false);
  const [focusedKey, setFocusedKey] = createSignal();
  const selectedKeysProp = createMemo(() => {
    const selection = access$1(mergedProps.selectedKeys);
    if (selection != null) {
      return convertSelection(selection);
    }
    return selection;
  });
  const defaultSelectedKeys = createMemo(() => {
    const defaultSelection = access$1(mergedProps.defaultSelectedKeys);
    if (defaultSelection != null) {
      return convertSelection(defaultSelection);
    }
    return new Selection();
  });
  const [selectedKeys, _setSelectedKeys] = createControllableSelectionSignal({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys,
    onChange: (value) => {
      var _a;
      return (_a = mergedProps.onSelectionChange) == null ? void 0 : _a.call(mergedProps, value);
    }
  });
  const [selectionBehavior, setSelectionBehavior] = createSignal(access$1(mergedProps.selectionBehavior));
  const selectionMode = () => access$1(mergedProps.selectionMode);
  const disallowEmptySelection = () => {
    var _a;
    return (_a = access$1(mergedProps.disallowEmptySelection)) != null ? _a : false;
  };
  const setSelectedKeys = (keys) => {
    if (access$1(mergedProps.allowDuplicateSelectionEvents) || !isSameSelection(keys, selectedKeys())) {
      _setSelectedKeys(keys);
    }
  };
  createEffect(() => {
    const selection = selectedKeys();
    if (access$1(mergedProps.selectionBehavior) === "replace" && selectionBehavior() === "toggle" && typeof selection === "object" && selection.size === 0) {
      setSelectionBehavior("replace");
    }
  });
  createEffect(() => {
    var _a;
    setSelectionBehavior((_a = access$1(mergedProps.selectionBehavior)) != null ? _a : "toggle");
  });
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    isFocused,
    setFocused,
    focusedKey,
    setFocusedKey,
    selectedKeys,
    setSelectedKeys
  };
}
function createTypeSelect(props) {
  const [search, setSearch] = createSignal("");
  const [timeoutId, setTimeoutId] = createSignal(-1);
  const onKeyDown = (e) => {
    var _a, _b, _c;
    if (access$1(props.isDisabled)) {
      return;
    }
    const delegate = access$1(props.keyboardDelegate);
    const manager = access$1(props.selectionManager);
    if (!delegate.getKeyForSearch) {
      return;
    }
    const character = getStringForKey(e.key);
    if (!character || e.ctrlKey || e.metaKey) {
      return;
    }
    if (character === " " && search().trim().length > 0) {
      e.preventDefault();
      e.stopPropagation();
    }
    let newSearch = setSearch((prev) => prev + character);
    let key = (_a = delegate.getKeyForSearch(newSearch, manager.focusedKey())) != null ? _a : delegate.getKeyForSearch(newSearch);
    if (key == null && isAllSameLetter(newSearch)) {
      newSearch = newSearch[0];
      key = (_b = delegate.getKeyForSearch(newSearch, manager.focusedKey())) != null ? _b : delegate.getKeyForSearch(newSearch);
    }
    if (key != null) {
      manager.setFocusedKey(key);
      (_c = props.onTypeSelect) == null ? void 0 : _c.call(props, key);
    }
    clearTimeout(timeoutId());
    setTimeoutId(window.setTimeout(() => setSearch(""), 500));
  };
  return {
    typeSelectHandlers: {
      onKeyDown
    }
  };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
function isAllSameLetter(search) {
  return search.split("").every((letter) => letter === search[0]);
}
function createSelectableCollection(props, ref, scrollRef) {
  const defaultProps = {
    selectOnFocus: () => access$1(props.selectionManager).selectionBehavior() === "replace"
  };
  const mergedProps = mergeProps(defaultProps, props);
  const finalScrollRef = () => {
    var _a;
    return (_a = scrollRef == null ? void 0 : scrollRef()) != null ? _a : ref();
  };
  const {
    direction
  } = useLocale();
  let scrollPos = {
    top: 0,
    left: 0
  };
  createEventListener(() => !access$1(mergedProps.isVirtualized) ? finalScrollRef() : void 0, "scroll", () => {
    const scrollEl = finalScrollRef();
    if (!scrollEl) {
      return;
    }
    scrollPos = {
      top: scrollEl.scrollTop,
      left: scrollEl.scrollLeft
    };
  });
  const {
    typeSelectHandlers
  } = createTypeSelect({
    isDisabled: () => access$1(mergedProps.disallowTypeAhead),
    keyboardDelegate: () => access$1(mergedProps.keyboardDelegate),
    selectionManager: () => access$1(mergedProps.selectionManager)
  });
  const orientation = () => {
    var _a;
    return (_a = access$1(mergedProps.orientation)) != null ? _a : "vertical";
  };
  const onKeyDown = (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    callHandler(e, typeSelectHandlers.onKeyDown);
    if (e.altKey && e.key === "Tab") {
      e.preventDefault();
    }
    const refEl = ref();
    if (!(refEl == null ? void 0 : refEl.contains(e.target))) {
      return;
    }
    const manager = access$1(mergedProps.selectionManager);
    const selectOnFocus = access$1(mergedProps.selectOnFocus);
    const navigateToKey = (key) => {
      if (key != null) {
        manager.setFocusedKey(key);
        if (e.shiftKey && manager.selectionMode() === "multiple") {
          manager.extendSelection(key);
        } else if (selectOnFocus && !isNonContiguousSelectionModifier(e)) {
          manager.replaceSelection(key);
        }
      }
    };
    const delegate = access$1(mergedProps.keyboardDelegate);
    const shouldFocusWrap = access$1(mergedProps.shouldFocusWrap);
    const focusedKey = manager.focusedKey();
    switch (e.key) {
      case (orientation() === "vertical" ? "ArrowDown" : "ArrowRight"): {
        if (delegate.getKeyBelow) {
          e.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyBelow(focusedKey);
          } else {
            nextKey = (_a = delegate.getFirstKey) == null ? void 0 : _a.call(delegate);
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = (_b = delegate.getFirstKey) == null ? void 0 : _b.call(delegate, focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowUp" : "ArrowLeft"): {
        if (delegate.getKeyAbove) {
          e.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyAbove(focusedKey);
          } else {
            nextKey = (_c = delegate.getLastKey) == null ? void 0 : _c.call(delegate);
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = (_d = delegate.getLastKey) == null ? void 0 : _d.call(delegate, focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowLeft" : "ArrowUp"): {
        if (delegate.getKeyLeftOf) {
          e.preventDefault();
          const isRTL2 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyLeftOf(focusedKey);
          } else {
            nextKey = isRTL2 ? (_e = delegate.getFirstKey) == null ? void 0 : _e.call(delegate) : (_f = delegate.getLastKey) == null ? void 0 : _f.call(delegate);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowRight" : "ArrowDown"): {
        if (delegate.getKeyRightOf) {
          e.preventDefault();
          const isRTL2 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyRightOf(focusedKey);
          } else {
            nextKey = isRTL2 ? (_g = delegate.getLastKey) == null ? void 0 : _g.call(delegate) : (_h = delegate.getFirstKey) == null ? void 0 : _h.call(delegate);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case "Home":
        if (delegate.getFirstKey) {
          e.preventDefault();
          const firstKey = delegate.getFirstKey(focusedKey, isCtrlKeyPressed(e));
          if (firstKey != null) {
            manager.setFocusedKey(firstKey);
            if (isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(firstKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(firstKey);
            }
          }
        }
        break;
      case "End":
        if (delegate.getLastKey) {
          e.preventDefault();
          const lastKey = delegate.getLastKey(focusedKey, isCtrlKeyPressed(e));
          if (lastKey != null) {
            manager.setFocusedKey(lastKey);
            if (isCtrlKeyPressed(e) && e.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(lastKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(lastKey);
            }
          }
        }
        break;
      case "PageDown":
        if (delegate.getKeyPageBelow && focusedKey != null) {
          e.preventDefault();
          const nextKey = delegate.getKeyPageBelow(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "PageUp":
        if (delegate.getKeyPageAbove && focusedKey != null) {
          e.preventDefault();
          const nextKey = delegate.getKeyPageAbove(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "a":
        if (isCtrlKeyPressed(e) && manager.selectionMode() === "multiple" && access$1(mergedProps.disallowSelectAll) !== true) {
          e.preventDefault();
          manager.selectAll();
        }
        break;
      case "Escape":
        if (!e.defaultPrevented) {
          e.preventDefault();
          if (!access$1(mergedProps.disallowEmptySelection)) {
            manager.clearSelection();
          }
        }
        break;
      case "Tab": {
        if (!access$1(mergedProps.allowsTabNavigation)) {
          if (e.shiftKey) {
            refEl.focus();
          } else {
            const walker = getFocusableTreeWalker(refEl, {
              tabbable: true
            });
            let next;
            let last;
            do {
              last = walker.lastChild();
              if (last) {
                next = last;
              }
            } while (last);
            if (next && !next.contains(document.activeElement)) {
              focusWithoutScrolling(next);
            }
          }
          break;
        }
      }
    }
  };
  const onFocusIn = (e) => {
    var _a, _b, _c, _d;
    const manager = access$1(mergedProps.selectionManager);
    const delegate = access$1(mergedProps.keyboardDelegate);
    const selectOnFocus = access$1(mergedProps.selectOnFocus);
    if (manager.isFocused()) {
      if (!e.currentTarget.contains(e.target)) {
        manager.setFocused(false);
      }
      return;
    }
    if (!e.currentTarget.contains(e.target)) {
      return;
    }
    manager.setFocused(true);
    if (manager.focusedKey() == null) {
      const navigateToFirstKey = (key) => {
        if (key == null) {
          return;
        }
        manager.setFocusedKey(key);
        if (selectOnFocus) {
          manager.replaceSelection(key);
        }
      };
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) {
        navigateToFirstKey((_b = manager.lastSelectedKey()) != null ? _b : (_a = delegate.getLastKey) == null ? void 0 : _a.call(delegate));
      } else {
        navigateToFirstKey((_d = manager.firstSelectedKey()) != null ? _d : (_c = delegate.getFirstKey) == null ? void 0 : _c.call(delegate));
      }
    } else if (!access$1(mergedProps.isVirtualized)) {
      const scrollEl = finalScrollRef();
      if (scrollEl) {
        scrollEl.scrollTop = scrollPos.top;
        scrollEl.scrollLeft = scrollPos.left;
        const element = scrollEl.querySelector(`[data-key="${manager.focusedKey()}"]`);
        if (element) {
          focusWithoutScrolling(element);
          scrollIntoView(scrollEl, element);
        }
      }
    }
  };
  const onFocusOut = (e) => {
    const manager = access$1(mergedProps.selectionManager);
    if (!e.currentTarget.contains(e.relatedTarget)) {
      manager.setFocused(false);
    }
  };
  const onMouseDown = (e) => {
    if (finalScrollRef() === e.target) {
      e.preventDefault();
    }
  };
  const tryAutoFocus = () => {
    var _a, _b;
    const autoFocus = access$1(mergedProps.autoFocus);
    if (!autoFocus) {
      return;
    }
    const manager = access$1(mergedProps.selectionManager);
    const delegate = access$1(mergedProps.keyboardDelegate);
    let focusedKey;
    if (autoFocus === "first") {
      focusedKey = (_a = delegate.getFirstKey) == null ? void 0 : _a.call(delegate);
    }
    if (autoFocus === "last") {
      focusedKey = (_b = delegate.getLastKey) == null ? void 0 : _b.call(delegate);
    }
    const selectedKeys = manager.selectedKeys();
    if (selectedKeys.size) {
      focusedKey = selectedKeys.values().next().value;
    }
    manager.setFocused(true);
    manager.setFocusedKey(focusedKey);
    const refEl = ref();
    if (refEl && focusedKey == null && !access$1(mergedProps.shouldUseVirtualFocus)) {
      focusWithoutScrolling(refEl);
    }
  };
  onMount(() => {
    if (mergedProps.deferAutoFocus) {
      setTimeout(tryAutoFocus, 0);
    } else {
      tryAutoFocus();
    }
  });
  createEffect(on([finalScrollRef, () => access$1(mergedProps.isVirtualized), () => access$1(mergedProps.selectionManager).focusedKey()], (newValue) => {
    var _a;
    const [scrollEl, isVirtualized, focusedKey] = newValue;
    if (isVirtualized) {
      focusedKey && ((_a = mergedProps.scrollToKey) == null ? void 0 : _a.call(mergedProps, focusedKey));
    } else {
      if (focusedKey && scrollEl) {
        const element = scrollEl.querySelector(`[data-key="${focusedKey}"]`);
        if (element) {
          scrollIntoView(scrollEl, element);
        }
      }
    }
  }));
  const tabIndex = createMemo(() => {
    if (access$1(mergedProps.shouldUseVirtualFocus)) {
      return void 0;
    }
    return access$1(mergedProps.selectionManager).focusedKey() == null ? 0 : -1;
  });
  return {
    tabIndex,
    onKeyDown,
    onMouseDown,
    onFocusIn,
    onFocusOut
  };
}
function createSelectableItem(props, ref) {
  const manager = () => access$1(props.selectionManager);
  const key = () => access$1(props.key);
  const shouldUseVirtualFocus = () => access$1(props.shouldUseVirtualFocus);
  const onSelect = (e) => {
    if (manager().selectionMode() === "none") {
      return;
    }
    if (manager().selectionMode() === "single") {
      if (manager().isSelected(key()) && !manager().disallowEmptySelection()) {
        manager().toggleSelection(key());
      } else {
        manager().replaceSelection(key());
      }
    } else if (e == null ? void 0 : e.shiftKey) {
      manager().extendSelection(key());
    } else if (manager().selectionBehavior() === "toggle" || isCtrlKeyPressed(e) || "pointerType" in e && e.pointerType === "touch") {
      manager().toggleSelection(key());
    } else {
      manager().replaceSelection(key());
    }
  };
  const isSelected = () => manager().isSelected(key());
  const isDisabled = () => access$1(props.disabled) || manager().isDisabled(key());
  const allowsSelection = () => !isDisabled() && manager().canSelectItem(key());
  let pointerDownType = null;
  const onPointerDown = (e) => {
    if (!allowsSelection()) {
      return;
    }
    pointerDownType = e.pointerType;
    if (e.pointerType === "mouse" && e.button === 0 && !access$1(props.shouldSelectOnPressUp)) {
      onSelect(e);
    }
  };
  const onPointerUp = (e) => {
    if (!allowsSelection()) {
      return;
    }
    if (e.pointerType === "mouse" && e.button === 0 && access$1(props.shouldSelectOnPressUp) && access$1(props.allowsDifferentPressOrigin)) {
      onSelect(e);
    }
  };
  const onClick = (e) => {
    if (!allowsSelection()) {
      return;
    }
    if (access$1(props.shouldSelectOnPressUp) && !access$1(props.allowsDifferentPressOrigin) || pointerDownType !== "mouse") {
      onSelect(e);
    }
  };
  const onKeyDown = (e) => {
    if (!allowsSelection() || !["Enter", " "].includes(e.key)) {
      return;
    }
    if (isNonContiguousSelectionModifier(e)) {
      manager().toggleSelection(key());
    } else {
      onSelect(e);
    }
  };
  const onMouseDown = (e) => {
    if (isDisabled()) {
      e.preventDefault();
    }
  };
  const onFocus = (e) => {
    const refEl = ref();
    if (shouldUseVirtualFocus() || isDisabled() || !refEl) {
      return;
    }
    if (e.target === refEl) {
      manager().setFocusedKey(key());
    }
  };
  const tabIndex = createMemo(() => {
    if (shouldUseVirtualFocus() || isDisabled()) {
      return void 0;
    }
    return key() === manager().focusedKey() ? 0 : -1;
  });
  const dataKey = createMemo(() => {
    return access$1(props.virtualized) ? void 0 : key();
  });
  createEffect(on([ref, key, shouldUseVirtualFocus, () => manager().focusedKey(), () => manager().isFocused()], ([refEl, key2, shouldUseVirtualFocus2, focusedKey, isFocused]) => {
    if (refEl && key2 === focusedKey && isFocused && !shouldUseVirtualFocus2 && document.activeElement !== refEl) {
      if (props.focus) {
        props.focus();
      } else {
        focusWithoutScrolling(refEl);
      }
    }
  }));
  return {
    isSelected,
    isDisabled,
    allowsSelection,
    tabIndex,
    dataKey,
    onPointerDown,
    onPointerUp,
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus
  };
}
var SelectionManager = class {
  constructor(collection, state) {
    __publicField(this, "collection");
    __publicField(this, "state");
    this.collection = collection;
    this.state = state;
  }
  /** The type of selection that is allowed in the collection. */
  selectionMode() {
    return this.state.selectionMode();
  }
  /** Whether the collection allows empty selection. */
  disallowEmptySelection() {
    return this.state.disallowEmptySelection();
  }
  /** The selection behavior for the collection. */
  selectionBehavior() {
    return this.state.selectionBehavior();
  }
  /** Sets the selection behavior for the collection. */
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  /** Whether the collection is currently focused. */
  isFocused() {
    return this.state.isFocused();
  }
  /** Sets whether the collection is focused. */
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  /** The current focused key in the collection. */
  focusedKey() {
    return this.state.focusedKey();
  }
  /** Sets the focused key. */
  setFocusedKey(key) {
    if (key == null || this.collection().getItem(key)) {
      this.state.setFocusedKey(key);
    }
  }
  /** The currently selected keys in the collection. */
  selectedKeys() {
    return this.state.selectedKeys();
  }
  /** Returns whether a key is selected. */
  isSelected(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return false;
    }
    return this.state.selectedKeys().has(retrievedKey);
  }
  /** Whether the selection is empty. */
  isEmpty() {
    return this.state.selectedKeys().size === 0;
  }
  /** Whether all items in the collection are selected. */
  isSelectAll() {
    if (this.isEmpty()) {
      return false;
    }
    const selectedKeys = this.state.selectedKeys();
    return this.getAllSelectableKeys().every((k) => selectedKeys.has(k));
  }
  firstSelectedKey() {
    let first;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemBeforeFirst = (item == null ? void 0 : item.index) != null && (first == null ? void 0 : first.index) != null && item.index < first.index;
      if (!first || isItemBeforeFirst) {
        first = item;
      }
    }
    return first == null ? void 0 : first.key;
  }
  lastSelectedKey() {
    let last;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemAfterLast = (item == null ? void 0 : item.index) != null && (last == null ? void 0 : last.index) != null && item.index > last.index;
      if (!last || isItemAfterLast) {
        last = item;
      }
    }
    return last == null ? void 0 : last.key;
  }
  /** Extends the selection to the given key. */
  extendSelection(toKey) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      this.replaceSelection(toKey);
      return;
    }
    const retrievedToKey = this.getKey(toKey);
    if (retrievedToKey == null) {
      return;
    }
    const selectedKeys = this.state.selectedKeys();
    const anchorKey = selectedKeys.anchorKey || retrievedToKey;
    const selection = new Selection(selectedKeys, anchorKey, retrievedToKey);
    for (const key of this.getKeyRange(anchorKey, selectedKeys.currentKey || retrievedToKey)) {
      selection.delete(key);
    }
    for (const key of this.getKeyRange(retrievedToKey, anchorKey)) {
      if (this.canSelectItem(key)) {
        selection.add(key);
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    const fromItem = this.collection().getItem(from);
    const toItem = this.collection().getItem(to);
    if (fromItem && toItem) {
      if (fromItem.index != null && toItem.index != null && fromItem.index <= toItem.index) {
        return this.getKeyRangeInternal(from, to);
      }
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    const keys = [];
    let key = from;
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item") {
        keys.push(key);
      }
      if (key === to) {
        return keys;
      }
      key = this.collection().getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    const item = this.collection().getItem(key);
    if (!item) {
      return key;
    }
    if (!item || item.type !== "item") {
      return null;
    }
    return item.key;
  }
  /** Toggles whether the given key is selected. */
  toggleSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const keys = new Selection(this.state.selectedKeys());
    if (keys.has(retrievedKey)) {
      keys.delete(retrievedKey);
    } else if (this.canSelectItem(retrievedKey)) {
      keys.add(retrievedKey);
      keys.anchorKey = retrievedKey;
      keys.currentKey = retrievedKey;
    }
    if (this.disallowEmptySelection() && keys.size === 0) {
      return;
    }
    this.state.setSelectedKeys(keys);
  }
  /** Replaces the selection with only the given key. */
  replaceSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const selection = this.canSelectItem(retrievedKey) ? new Selection([retrievedKey], retrievedKey, retrievedKey) : new Selection();
    this.state.setSelectedKeys(selection);
  }
  /** Replaces the selection with the given keys. */
  setSelectedKeys(keys) {
    if (this.selectionMode() === "none") {
      return;
    }
    const selection = new Selection();
    for (const key of keys) {
      const retrievedKey = this.getKey(key);
      if (retrievedKey != null) {
        selection.add(retrievedKey);
        if (this.selectionMode() === "single") {
          break;
        }
      }
    }
    this.state.setSelectedKeys(selection);
  }
  /** Selects all items in the collection. */
  selectAll() {
    if (this.selectionMode() === "multiple") {
      this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()));
    }
  }
  /**
   * Removes all keys from the selection.
   */
  clearSelection() {
    const selectedKeys = this.state.selectedKeys();
    if (!this.disallowEmptySelection() && selectedKeys.size > 0) {
      this.state.setSelectedKeys(new Selection());
    }
  }
  /**
   * Toggles between select all and an empty selection.
   */
  toggleSelectAll() {
    if (this.isSelectAll()) {
      this.clearSelection();
    } else {
      this.selectAll();
    }
  }
  select(key, e) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection()) {
        this.toggleSelection(key);
      } else {
        this.replaceSelection(key);
      }
    } else if (this.selectionBehavior() === "toggle" || e && e.pointerType === "touch") {
      this.toggleSelection(key);
    } else {
      this.replaceSelection(key);
    }
  }
  /** Returns whether the current selection is equal to the given selection. */
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys()) {
      return true;
    }
    const selectedKeys = this.selectedKeys();
    if (selection.size !== selectedKeys.size) {
      return false;
    }
    for (const key of selection) {
      if (!selectedKeys.has(key)) {
        return false;
      }
    }
    for (const key of selectedKeys) {
      if (!selection.has(key)) {
        return false;
      }
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const item = this.collection().getItem(key);
    return item != null && !item.disabled;
  }
  isDisabled(key) {
    const item = this.collection().getItem(key);
    return !item || item.disabled;
  }
  getAllSelectableKeys() {
    const keys = [];
    const addKeys = (key) => {
      while (key != null) {
        if (this.canSelectItem(key)) {
          const item = this.collection().getItem(key);
          if (!item) {
            continue;
          }
          if (item.type === "item") {
            keys.push(key);
          }
        }
        key = this.collection().getKeyAfter(key);
      }
    };
    addKeys(this.collection().getFirstKey());
    return keys;
  }
};
var ListCollection = class {
  constructor(nodes) {
    __publicField(this, "keyMap", /* @__PURE__ */ new Map());
    __publicField(this, "iterable");
    __publicField(this, "firstKey");
    __publicField(this, "lastKey");
    this.iterable = nodes;
    for (const node of nodes) {
      this.keyMap.set(node.key, node);
    }
    if (this.keyMap.size === 0) {
      return;
    }
    let last;
    let index = 0;
    for (const [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = void 0;
      }
      if (node.type === "item") {
        node.index = index++;
      }
      last = node;
      last.nextKey = void 0;
    }
    this.lastKey = last.key;
  }
  *[Symbol.iterator]() {
    yield* this.iterable;
  }
  getSize() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    var _a;
    return (_a = this.keyMap.get(key)) == null ? void 0 : _a.prevKey;
  }
  getKeyAfter(key) {
    var _a;
    return (_a = this.keyMap.get(key)) == null ? void 0 : _a.nextKey;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key);
  }
  at(idx) {
    const keys = [...this.getKeys()];
    return this.getItem(keys[idx]);
  }
};
function createListState(props) {
  const selectionState = createMultipleSelectionState(props);
  const factory = (nodes) => {
    return props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
  };
  const collection = createCollection({
    dataSource: () => access$1(props.dataSource),
    getKey: () => access$1(props.getKey),
    getTextValue: () => access$1(props.getTextValue),
    getDisabled: () => access$1(props.getDisabled),
    getSectionChildren: () => access$1(props.getSectionChildren),
    factory
  }, [() => props.filter]);
  const selectionManager = new SelectionManager(collection, selectionState);
  createComputed(() => {
    const focusedKey = selectionState.focusedKey();
    if (focusedKey != null && !collection().getItem(focusedKey)) {
      selectionState.setFocusedKey(void 0);
    }
  });
  return {
    collection,
    selectionManager: () => selectionManager
  };
}
function createRegisterId(setter) {
  return (id2) => {
    setter(id2);
    return () => setter(void 0);
  };
}
function Polymorphic(props) {
  const [local, others] = splitProps(props, ["as"]);
  if (!local.as) {
    throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
  }
  return (
    // @ts-ignore: Props are valid but not worth calculating
    createComponent(Dynamic, mergeProps$1(others, {
      get component() {
        return local.as;
      }
    }))
  );
}
var FORM_CONTROL_PROP_NAMES = ["id", "name", "validationState", "required", "disabled", "readOnly"];
function createFormControl(props) {
  const defaultId = `form-control-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [labelId, setLabelId] = createSignal();
  const [fieldId, setFieldId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [errorMessageId, setErrorMessageId] = createSignal();
  const getAriaLabelledBy = (fieldId2, fieldAriaLabel, fieldAriaLabelledBy) => {
    const hasAriaLabelledBy = fieldAriaLabelledBy != null || labelId() != null;
    return [
      fieldAriaLabelledBy,
      labelId(),
      // If there is both an aria-label and aria-labelledby, add the field itself has an aria-labelledby
      hasAriaLabelledBy && fieldAriaLabel != null ? fieldId2 : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const getAriaDescribedBy = (fieldAriaDescribedBy) => {
    return [
      descriptionId(),
      // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA.
      // See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
      errorMessageId(),
      fieldAriaDescribedBy
    ].filter(Boolean).join(" ") || void 0;
  };
  const dataset = createMemo(() => ({
    "data-valid": access$1(mergedProps.validationState) === "valid" ? "" : void 0,
    "data-invalid": access$1(mergedProps.validationState) === "invalid" ? "" : void 0,
    "data-required": access$1(mergedProps.required) ? "" : void 0,
    "data-disabled": access$1(mergedProps.disabled) ? "" : void 0,
    "data-readonly": access$1(mergedProps.readOnly) ? "" : void 0
  }));
  const formControlContext = {
    name: () => {
      var _a;
      return (_a = access$1(mergedProps.name)) != null ? _a : access$1(mergedProps.id);
    },
    dataset,
    validationState: () => access$1(mergedProps.validationState),
    isRequired: () => access$1(mergedProps.required),
    isDisabled: () => access$1(mergedProps.disabled),
    isReadOnly: () => access$1(mergedProps.readOnly),
    labelId,
    fieldId,
    descriptionId,
    errorMessageId,
    getAriaLabelledBy,
    getAriaDescribedBy,
    generateId: createGenerateId(() => access$1(mergedProps.id)),
    registerLabel: createRegisterId(setLabelId),
    registerField: createRegisterId(setFieldId),
    registerDescription: createRegisterId(setDescriptionId),
    registerErrorMessage: createRegisterId(setErrorMessageId)
  };
  return {
    formControlContext
  };
}
var FormControlContext = createContext();
function useFormControlContext() {
  const context = useContext(FormControlContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");
  }
  return context;
}
function FormControlDescription(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps$1({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
var _tmpl$$3 = ["<option", "", ">", "</option>"], _tmpl$2$1 = "<option></option>", _tmpl$3$1 = ["<div", ' style="', '" aria-hidden="true"><input type="text"', ' style="', '"', "", ">", "</div>"];
function HiddenSelectBase(props) {
  const [local, others] = splitProps(props, ["ref", "onChange", "collection", "selectionManager", "isOpen", "isMultiple", "isVirtualized", "focusTrigger"]);
  const formControlContext = useFormControlContext();
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const renderOption = (key) => {
    const item = local.collection.getItem(key);
    return createComponent(Show, {
      get when() {
        return (item == null ? void 0 : item.type) === "item";
      },
      get children() {
        return ssr(_tmpl$$3, ssrHydrationKey() + ssrAttribute("value", escape(key, true), false), ssrAttribute("selected", local.selectionManager.isSelected(key), true), escape(item == null ? void 0 : item.textValue));
      }
    });
  };
  createEffect(on(() => local.selectionManager.selectedKeys(), (keys, prevKeys) => {
    if (prevKeys && isSameSelection(keys, prevKeys)) {
      return;
    }
    setIsInternalChangeEvent(true);
  }, {
    defer: true
  }));
  return ssr(_tmpl$3$1, ssrHydrationKey(), ssrStyle(visuallyHiddenStyles), ssrAttribute("tabindex", local.selectionManager.isFocused() || local.isOpen ? -1 : 0, false), ssrStyleProperty("font-size:", "16px"), ssrAttribute("required", formControlContext.isRequired(), true), ssrAttribute("disabled", formControlContext.isDisabled(), true) + ssrAttribute("readonly", escape(formControlContext.isReadOnly(), true), false), ssrElement("select", mergeProps$1({
    tabIndex: -1,
    get multiple() {
      return local.isMultiple;
    },
    get name() {
      return formControlContext.name();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return formControlContext.isDisabled();
    },
    get size() {
      return local.collection.getSize();
    },
    get value() {
      var _a;
      return (_a = local.selectionManager.firstSelectedKey()) != null ? _a : "";
    }
  }, others), () => [ssr(_tmpl$2$1), "<!--$-->", escape(createComponent(Show, {
    get when() {
      return local.isVirtualized;
    },
    get fallback() {
      return createComponent(For, {
        get each() {
          return [...local.collection.getKeys()];
        },
        children: renderOption
      });
    },
    get children() {
      return createComponent(For, {
        get each() {
          return [...local.selectionManager.selectedKeys()];
        },
        children: renderOption
      });
    }
  })), "<!--/-->"], false));
}
var cache = /* @__PURE__ */ new WeakMap();
function getItemCount(collection) {
  let count = cache.get(collection);
  if (count != null) {
    return count;
  }
  count = 0;
  for (const item of collection) {
    if (item.type === "item") {
      count++;
    }
  }
  cache.set(collection, count);
  return count;
}
var ListKeyboardDelegate = class {
  constructor(collection, ref, collator) {
    __publicField(this, "collection");
    __publicField(this, "ref");
    __publicField(this, "collator");
    this.collection = collection;
    this.ref = ref;
    this.collator = collator;
  }
  getKeyBelow(key) {
    let keyAfter = this.collection().getKeyAfter(key);
    while (keyAfter != null) {
      const item = this.collection().getItem(keyAfter);
      if (item && item.type === "item" && !item.disabled) {
        return keyAfter;
      }
      keyAfter = this.collection().getKeyAfter(keyAfter);
    }
  }
  getKeyAbove(key) {
    let keyBefore = this.collection().getKeyBefore(key);
    while (keyBefore != null) {
      const item = this.collection().getItem(keyBefore);
      if (item && item.type === "item" && !item.disabled) {
        return keyBefore;
      }
      keyBefore = this.collection().getKeyBefore(keyBefore);
    }
  }
  getFirstKey() {
    let key = this.collection().getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyAfter(key);
    }
  }
  getLastKey() {
    let key = this.collection().getLastKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyBefore(key);
    }
  }
  getItem(key) {
    var _a, _b, _c;
    return (_c = (_b = (_a = this.ref) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.querySelector(`[data-key="${key}"]`)) != null ? _c : null;
  }
  // TODO: not working correctly
  getKeyPageAbove(key) {
    var _a;
    const menu = (_a = this.ref) == null ? void 0 : _a.call(this);
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.max(0, item.offsetTop + item.offsetHeight - menu.offsetHeight);
    let keyAbove = key;
    while (keyAbove && item && item.offsetTop > pageY) {
      keyAbove = this.getKeyAbove(keyAbove);
      item = keyAbove != null ? this.getItem(keyAbove) : null;
    }
    return keyAbove;
  }
  // TODO: not working correctly
  getKeyPageBelow(key) {
    var _a;
    const menu = (_a = this.ref) == null ? void 0 : _a.call(this);
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.min(menu.scrollHeight, item.offsetTop - item.offsetHeight + menu.offsetHeight);
    let keyBelow = key;
    while (keyBelow && item && item.offsetTop < pageY) {
      keyBelow = this.getKeyBelow(keyBelow);
      item = keyBelow != null ? this.getItem(keyBelow) : null;
    }
    return keyBelow;
  }
  getKeyForSearch(search, fromKey) {
    var _a;
    const collator = (_a = this.collator) == null ? void 0 : _a.call(this);
    if (!collator) {
      return;
    }
    let key = fromKey != null ? this.getKeyBelow(fromKey) : this.getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item) {
        const substring = item.textValue.slice(0, search.length);
        if (item.textValue && collator.compare(substring, search) === 0) {
          return key;
        }
      }
      key = this.getKeyBelow(key);
    }
  }
};
function createSelectableList(props, ref, scrollRef) {
  const collator = createCollator({
    usage: "search",
    sensitivity: "base"
  });
  const delegate = createMemo(() => {
    const keyboardDelegate = access$1(props.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(props.collection, ref, collator);
  });
  return createSelectableCollection({
    selectionManager: () => access$1(props.selectionManager),
    keyboardDelegate: delegate,
    autoFocus: () => access$1(props.autoFocus),
    deferAutoFocus: () => access$1(props.deferAutoFocus),
    shouldFocusWrap: () => access$1(props.shouldFocusWrap),
    disallowEmptySelection: () => access$1(props.disallowEmptySelection),
    selectOnFocus: () => access$1(props.selectOnFocus),
    disallowTypeAhead: () => access$1(props.disallowTypeAhead),
    shouldUseVirtualFocus: () => access$1(props.shouldUseVirtualFocus),
    allowsTabNavigation: () => access$1(props.allowsTabNavigation),
    isVirtualized: () => access$1(props.isVirtualized),
    scrollToKey: (key) => {
      var _a;
      return (_a = access$1(props.scrollToKey)) == null ? void 0 : _a(key);
    },
    orientation: () => access$1(props.orientation)
  }, ref, scrollRef);
}
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp2(target, name, {
    get: all[name],
    enumerable: true
  });
};
var listbox_exports = {};
__export(listbox_exports, {
  Item: () => ListboxItem,
  ItemDescription: () => ListboxItemDescription,
  ItemIndicator: () => ListboxItemIndicator,
  ItemLabel: () => ListboxItemLabel,
  Listbox: () => Listbox,
  Root: () => ListboxRoot,
  Section: () => ListboxSection,
  useListboxContext: () => useListboxContext
});
var ListboxContext = createContext();
function useListboxContext() {
  const context = useContext(ListboxContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useListboxContext` must be used within a `Listbox` component");
  }
  return context;
}
var ListboxItemContext = createContext();
function useListboxItemContext() {
  const context = useContext(ListboxItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useListboxItemContext` must be used within a `Listbox.Item` component");
  }
  return context;
}
function ListboxItem(props) {
  let ref;
  const listBoxContext = useListboxContext();
  const defaultId = `${listBoxContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "item", "aria-label", "aria-labelledby", "aria-describedby", "onPointerMove", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const selectionManager = () => listBoxContext.listState().selectionManager();
  const isHighlighted = () => selectionManager().focusedKey() === local.item.key;
  const selectableItem = createSelectableItem({
    key: () => local.item.key,
    selectionManager,
    shouldSelectOnPressUp: listBoxContext.shouldSelectOnPressUp,
    allowsDifferentPressOrigin: () => {
      return listBoxContext.shouldSelectOnPressUp() && listBoxContext.shouldFocusOnHover();
    },
    shouldUseVirtualFocus: listBoxContext.shouldUseVirtualFocus,
    disabled: () => local.item.disabled
  }, () => ref);
  const ariaSelected = () => {
    if (selectionManager().selectionMode() === "none") {
      return void 0;
    }
    return selectableItem.isSelected();
  };
  const isNotSafariMacOS = createMemo(() => true);
  const ariaLabel = () => isNotSafariMacOS() ? local["aria-label"] : void 0;
  const ariaLabelledBy = () => isNotSafariMacOS() ? labelId() : void 0;
  const ariaDescribedBy = () => isNotSafariMacOS() ? descriptionId() : void 0;
  const ariaPosInSet = () => {
    var _a;
    if (!listBoxContext.isVirtualized()) {
      return void 0;
    }
    const index = (_a = listBoxContext.listState().collection().getItem(local.item.key)) == null ? void 0 : _a.index;
    return index != null ? index + 1 : void 0;
  };
  const ariaSetSize = () => {
    if (!listBoxContext.isVirtualized()) {
      return void 0;
    }
    return getItemCount(listBoxContext.listState().collection());
  };
  const onPointerMove = (e) => {
    callHandler(e, local.onPointerMove);
    if (e.pointerType !== "mouse") {
      return;
    }
    if (!selectableItem.isDisabled() && listBoxContext.shouldFocusOnHover()) {
      focusWithoutScrolling(e.currentTarget);
      selectionManager().setFocused(true);
      selectionManager().setFocusedKey(local.item.key);
    }
  };
  const dataset = createMemo(() => ({
    "data-disabled": selectableItem.isDisabled() ? "" : void 0,
    "data-selected": selectableItem.isSelected() ? "" : void 0,
    "data-highlighted": isHighlighted() ? "" : void 0
  }));
  const context = {
    isSelected: selectableItem.isSelected,
    dataset,
    generateId: createGenerateId(() => others.id),
    registerLabelId: createRegisterId(setLabelId),
    registerDescriptionId: createRegisterId(setDescriptionId)
  };
  return createComponent(ListboxItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps$1({
        as: "li",
        role: "option",
        get tabIndex() {
          return selectableItem.tabIndex();
        },
        get ["aria-disabled"]() {
          return selectableItem.isDisabled();
        },
        get ["aria-selected"]() {
          return ariaSelected();
        },
        get ["aria-label"]() {
          return ariaLabel();
        },
        get ["aria-labelledby"]() {
          return ariaLabelledBy();
        },
        get ["aria-describedby"]() {
          return ariaDescribedBy();
        },
        get ["aria-posinset"]() {
          return ariaPosInSet();
        },
        get ["aria-setsize"]() {
          return ariaSetSize();
        },
        get ["data-key"]() {
          return selectableItem.dataKey();
        },
        get onPointerDown() {
          return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
        },
        get onPointerUp() {
          return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
        },
        get onClick() {
          return composeEventHandlers([local.onClick, selectableItem.onClick]);
        },
        get onKeyDown() {
          return composeEventHandlers([local.onKeyDown, selectableItem.onKeyDown]);
        },
        get onMouseDown() {
          return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
        },
        get onFocus() {
          return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
        },
        onPointerMove
      }, dataset, others));
    }
  });
}
function ListboxItemDescription(props) {
  const context = useListboxItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescriptionId(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps$1({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function ListboxItemIndicator(props) {
  const context = useListboxItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  return createComponent(Show, {
    get when() {
      return local.forceMount || context.isSelected();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps$1({
        as: "div",
        "aria-hidden": "true"
      }, () => context.dataset(), others));
    }
  });
}
function ListboxItemLabel(props) {
  const context = useListboxItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  createEffect(() => onCleanup(context.registerLabelId(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps$1({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function ListboxRoot(props) {
  let ref;
  const defaultId = `listbox-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    selectionMode: "single",
    virtualized: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "children", "renderItem", "renderSection", "value", "defaultValue", "onChange", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "state", "keyboardDelegate", "autoFocus", "selectionMode", "shouldFocusWrap", "shouldUseVirtualFocus", "shouldSelectOnPressUp", "shouldFocusOnHover", "allowDuplicateSelectionEvents", "disallowEmptySelection", "selectionBehavior", "selectOnFocus", "disallowTypeAhead", "allowsTabNavigation", "virtualized", "scrollToItem", "scrollRef", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  const listState = createMemo(() => {
    if (local.state) {
      return local.state;
    }
    return createListState({
      selectedKeys: () => local.value,
      defaultSelectedKeys: () => local.defaultValue,
      onSelectionChange: local.onChange,
      allowDuplicateSelectionEvents: () => access$1(local.allowDuplicateSelectionEvents),
      disallowEmptySelection: () => access$1(local.disallowEmptySelection),
      selectionBehavior: () => access$1(local.selectionBehavior),
      selectionMode: () => access$1(local.selectionMode),
      dataSource: () => {
        var _a;
        return (_a = local.options) != null ? _a : [];
      },
      getKey: () => local.optionValue,
      getTextValue: () => local.optionTextValue,
      getDisabled: () => local.optionDisabled,
      getSectionChildren: () => local.optionGroupChildren
    });
  });
  const selectableList = createSelectableList({
    selectionManager: () => listState().selectionManager(),
    collection: () => listState().collection(),
    autoFocus: () => access$1(local.autoFocus),
    shouldFocusWrap: () => access$1(local.shouldFocusWrap),
    keyboardDelegate: () => local.keyboardDelegate,
    disallowEmptySelection: () => access$1(local.disallowEmptySelection),
    selectOnFocus: () => access$1(local.selectOnFocus),
    disallowTypeAhead: () => access$1(local.disallowTypeAhead),
    shouldUseVirtualFocus: () => access$1(local.shouldUseVirtualFocus),
    allowsTabNavigation: () => access$1(local.allowsTabNavigation),
    isVirtualized: () => local.virtualized,
    scrollToKey: () => local.scrollToItem
  }, () => ref, () => {
    var _a;
    return (_a = local.scrollRef) == null ? void 0 : _a.call(local);
  });
  const context = {
    listState,
    generateId: createGenerateId(() => others.id),
    shouldUseVirtualFocus: () => mergedProps.shouldUseVirtualFocus,
    shouldSelectOnPressUp: () => mergedProps.shouldSelectOnPressUp,
    shouldFocusOnHover: () => mergedProps.shouldFocusOnHover,
    isVirtualized: () => local.virtualized
  };
  return createComponent(ListboxContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps$1({
        as: "ul",
        role: "listbox",
        get tabIndex() {
          return selectableList.tabIndex();
        },
        get ["aria-multiselectable"]() {
          return listState().selectionManager().selectionMode() === "multiple" ? true : void 0;
        },
        get onKeyDown() {
          return composeEventHandlers([local.onKeyDown, selectableList.onKeyDown]);
        },
        get onMouseDown() {
          return composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]);
        },
        get onFocusIn() {
          return composeEventHandlers([local.onFocusIn, selectableList.onFocusIn]);
        },
        get onFocusOut() {
          return composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]);
        }
      }, others, {
        get children() {
          return createComponent(Show, {
            get when() {
              return !local.virtualized;
            },
            get fallback() {
              var _a;
              return (_a = local.children) == null ? void 0 : _a.call(local, listState().collection);
            },
            get children() {
              return createComponent(Key, {
                get each() {
                  return [...listState().collection()];
                },
                by: "key",
                children: (item) => createComponent(Switch, {
                  get children() {
                    return [createComponent(Match, {
                      get when() {
                        return item().type === "section";
                      },
                      get children() {
                        var _a;
                        return (_a = local.renderSection) == null ? void 0 : _a.call(local, item());
                      }
                    }), createComponent(Match, {
                      get when() {
                        return item().type === "item";
                      },
                      get children() {
                        var _a;
                        return (_a = local.renderItem) == null ? void 0 : _a.call(local, item());
                      }
                    })];
                  }
                })
              });
            }
          });
        }
      }));
    }
  });
}
function ListboxSection(props) {
  return createComponent(Polymorphic, mergeProps$1({
    as: "li",
    role: "presentation"
  }, props));
}
var Listbox = Object.assign(ListboxRoot, {
  Item: ListboxItem,
  ItemDescription: ListboxItemDescription,
  ItemIndicator: ListboxItemIndicator,
  ItemLabel: ListboxItemLabel,
  Section: ListboxSection
});
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getNodeName(node) {
  if (isNode()) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode() ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  {
    return false;
  }
}
function isElement(value) {
  {
    return false;
  }
}
function isHTMLElement(value) {
  {
    return false;
  }
}
function isShadowRoot(value) {
  {
    return false;
  }
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement() ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement() && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement()) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot() && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot() ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement() && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement();
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement() ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement()) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement()) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement() ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement();
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement() ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement()) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement() || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement() && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement() && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement();
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement() || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement()) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement() && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const size = size$1;
const hide = hide$1;
const arrow = arrow$1;
const computePosition = (reference, floating, options) => {
  const cache2 = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache2
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var _tmpl$$2 = ["<svg", ' display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g', '><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path></g></svg>'];
var PopperContext = createContext();
function usePopperContext() {
  const context = useContext(PopperContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");
  }
  return context;
}
var DEFAULT_SIZE = 30;
var HALF_DEFAULT_SIZE = DEFAULT_SIZE / 2;
var ROTATION_DEG = {
  top: 180,
  right: -90,
  bottom: 0,
  left: 90
};
function PopperArrow(props) {
  const context = usePopperContext();
  const mergedProps = mergeDefaultProps({
    size: DEFAULT_SIZE
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "size"]);
  const dir = () => context.currentPlacement().split("-")[0];
  const contentStyle = createComputedStyle(context.contentRef);
  const fill = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue("background-color")) || "none";
  };
  const stroke = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue(`border-${dir()}-color`)) || "none";
  };
  const borderWidth = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue(`border-${dir()}-width`)) || "0px";
  };
  const strokeWidth = () => {
    return Number.parseInt(borderWidth()) * 2 * (DEFAULT_SIZE / local.size);
  };
  const rotate = () => {
    return `rotate(${ROTATION_DEG[dir()]} ${HALF_DEFAULT_SIZE} ${HALF_DEFAULT_SIZE}) translate(0 2)`;
  };
  return createComponent(Polymorphic, mergeProps$1({
    as: "div",
    "aria-hidden": "true",
    get style() {
      return combineStyle({
        // server side rendering
        position: "absolute",
        "font-size": `${local.size}px`,
        width: "1em",
        height: "1em",
        "pointer-events": "none",
        fill: fill(),
        stroke: stroke(),
        "stroke-width": strokeWidth()
      }, local.style);
    }
  }, others, {
    get children() {
      return ssr(_tmpl$$2, ssrHydrationKey(), ssrAttribute("transform", escape(rotate(), true), false));
    }
  }));
}
function createComputedStyle(element) {
  const [style, setStyle] = createSignal();
  createEffect(() => {
    const el = element();
    el && setStyle(getWindow$1(el).getComputedStyle(el));
  });
  return style;
}
function PopperPositioner(props) {
  usePopperContext();
  const [local, others] = splitProps(props, ["ref", "style"]);
  return createComponent(Polymorphic, mergeProps$1({
    as: "div",
    "data-popper-positioner": "",
    get style() {
      return combineStyle({
        position: "absolute",
        top: 0,
        left: 0,
        "min-width": "max-content"
      }, local.style);
    }
  }, others));
}
function createDOMRect(anchorRect) {
  const {
    x = 0,
    y = 0,
    width = 0,
    height = 0
  } = anchorRect != null ? anchorRect : {};
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x
  };
  return {
    ...rect,
    toJSON: () => rect
  };
}
function getAnchorElement(anchor, getAnchorRect) {
  const contextElement = anchor;
  return {
    contextElement,
    getBoundingClientRect: () => {
      const anchorRect = getAnchorRect(anchor);
      if (anchorRect) {
        return createDOMRect(anchorRect);
      }
      if (anchor) {
        return anchor.getBoundingClientRect();
      }
      return createDOMRect();
    }
  };
}
function isValidPlacement(flip2) {
  return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(flip2);
}
var REVERSE_BASE_PLACEMENT = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
function getTransformOrigin(placement, readingDirection) {
  const [basePlacement, alignment] = placement.split("-");
  const reversePlacement = REVERSE_BASE_PLACEMENT[basePlacement];
  if (!alignment) {
    return `${reversePlacement} center`;
  }
  if (basePlacement === "left" || basePlacement === "right") {
    return `${reversePlacement} ${alignment === "start" ? "top" : "bottom"}`;
  }
  if (alignment === "start") {
    return `${reversePlacement} ${readingDirection === "rtl" ? "right" : "left"}`;
  }
  return `${reversePlacement} ${readingDirection === "rtl" ? "left" : "right"}`;
}
function PopperRoot(props) {
  const mergedProps = mergeDefaultProps({
    getAnchorRect: (anchor) => anchor == null ? void 0 : anchor.getBoundingClientRect(),
    placement: "bottom",
    gutter: 0,
    shift: 0,
    flip: true,
    slide: true,
    overlap: false,
    sameWidth: false,
    fitViewport: false,
    hideWhenDetached: false,
    detachedPadding: 0,
    arrowPadding: 4,
    overflowPadding: 8
  }, props);
  const [positionerRef, setPositionerRef] = createSignal();
  const [arrowRef, setArrowRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(mergedProps.placement);
  const anchorRef = () => {
    var _a;
    return getAnchorElement((_a = mergedProps.anchorRef) == null ? void 0 : _a.call(mergedProps), mergedProps.getAnchorRect);
  };
  const {
    direction
  } = useLocale();
  async function updatePosition() {
    var _a, _b, _c;
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    const arrowEl = arrowRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const arrowOffset = ((arrowEl == null ? void 0 : arrowEl.clientHeight) || 0) / 2;
    const finalGutter = typeof mergedProps.gutter === "number" ? mergedProps.gutter + arrowOffset : (_a = mergedProps.gutter) != null ? _a : arrowOffset;
    floatingEl.style.setProperty("--kb-popper-content-overflow-padding", `${mergedProps.overflowPadding}px`);
    referenceEl.getBoundingClientRect();
    const middleware = [
      // https://floating-ui.com/docs/offset
      offset(({
        placement
      }) => {
        const hasAlignment = !!placement.split("-")[1];
        return {
          mainAxis: finalGutter,
          crossAxis: !hasAlignment ? mergedProps.shift : void 0,
          alignmentAxis: mergedProps.shift
        };
      })
    ];
    if (mergedProps.flip !== false) {
      const fallbackPlacements = typeof mergedProps.flip === "string" ? mergedProps.flip.split(" ") : void 0;
      if (fallbackPlacements !== void 0 && !fallbackPlacements.every(isValidPlacement)) {
        throw new Error("`flip` expects a spaced-delimited list of placements");
      }
      middleware.push(flip({
        padding: mergedProps.overflowPadding,
        fallbackPlacements
      }));
    }
    if (mergedProps.slide || mergedProps.overlap) {
      middleware.push(shift({
        mainAxis: mergedProps.slide,
        crossAxis: mergedProps.overlap,
        padding: mergedProps.overflowPadding
      }));
    }
    middleware.push(size({
      padding: mergedProps.overflowPadding,
      apply({
        availableWidth,
        availableHeight,
        rects
      }) {
        const referenceWidth = Math.round(rects.reference.width);
        availableWidth = Math.floor(availableWidth);
        availableHeight = Math.floor(availableHeight);
        floatingEl.style.setProperty("--kb-popper-anchor-width", `${referenceWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-width", `${availableWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-height", `${availableHeight}px`);
        if (mergedProps.sameWidth) {
          floatingEl.style.width = `${referenceWidth}px`;
        }
        if (mergedProps.fitViewport) {
          floatingEl.style.maxWidth = `${availableWidth}px`;
          floatingEl.style.maxHeight = `${availableHeight}px`;
        }
      }
    }));
    if (mergedProps.hideWhenDetached) {
      middleware.push(hide({
        padding: mergedProps.detachedPadding
      }));
    }
    if (arrowEl) {
      middleware.push(arrow({
        element: arrowEl,
        padding: mergedProps.arrowPadding
      }));
    }
    const pos = await computePosition(referenceEl, floatingEl, {
      placement: mergedProps.placement,
      strategy: "absolute",
      middleware,
      platform: {
        ...platform,
        isRTL: () => direction() === "rtl"
      }
    });
    setCurrentPlacement(pos.placement);
    (_b = mergedProps.onCurrentPlacementChange) == null ? void 0 : _b.call(mergedProps, pos.placement);
    if (!floatingEl) {
      return;
    }
    floatingEl.style.setProperty("--kb-popper-content-transform-origin", getTransformOrigin(pos.placement, direction()));
    const x = Math.round(pos.x);
    const y = Math.round(pos.y);
    let visibility;
    if (mergedProps.hideWhenDetached) {
      visibility = ((_c = pos.middlewareData.hide) == null ? void 0 : _c.referenceHidden) ? "hidden" : "visible";
    }
    Object.assign(floatingEl.style, {
      top: "0",
      left: "0",
      transform: `translate3d(${x}px, ${y}px, 0)`,
      visibility
    });
    if (arrowEl && pos.middlewareData.arrow) {
      const {
        x: arrowX,
        y: arrowY
      } = pos.middlewareData.arrow;
      const dir = pos.placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [dir]: "100%"
      });
    }
  }
  createEffect(() => {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const cleanupAutoUpdate = autoUpdate(referenceEl, floatingEl, updatePosition, {
      // JSDOM doesn't support ResizeObserver
      elementResize: typeof ResizeObserver === "function"
    });
    onCleanup(cleanupAutoUpdate);
  });
  createEffect(() => {
    var _a;
    const positioner = positionerRef();
    const content = (_a = mergedProps.contentRef) == null ? void 0 : _a.call(mergedProps);
    if (!positioner || !content) {
      return;
    }
    queueMicrotask(() => {
      positioner.style.zIndex = getComputedStyle(content).zIndex;
    });
  });
  const context = {
    currentPlacement,
    contentRef: () => {
      var _a;
      return (_a = mergedProps.contentRef) == null ? void 0 : _a.call(mergedProps);
    },
    setPositionerRef,
    setArrowRef
  };
  return createComponent(PopperContext.Provider, {
    value: context,
    get children() {
      return mergedProps.children;
    }
  });
}
var Popper = Object.assign(PopperRoot, {
  Arrow: PopperArrow,
  Context: PopperContext,
  usePopperContext,
  Positioner: PopperPositioner
});
var DATA_TOP_LAYER_ATTR = "data-kb-top-layer";
var originalBodyPointerEvents;
var hasDisabledBodyPointerEvents = false;
var layers = [];
function indexOf(node) {
  return layers.findIndex((layer) => layer.node === node);
}
function find(node) {
  return layers[indexOf(node)];
}
function isTopMostLayer(node) {
  return layers[layers.length - 1].node === node;
}
function getPointerBlockingLayers() {
  return layers.filter((layer) => layer.isPointerBlocking);
}
function getTopMostPointerBlockingLayer() {
  return [...getPointerBlockingLayers()].slice(-1)[0];
}
function hasPointerBlockingLayer() {
  return getPointerBlockingLayers().length > 0;
}
function isBelowPointerBlockingLayer(node) {
  var _a;
  const highestBlockingIndex = indexOf((_a = getTopMostPointerBlockingLayer()) == null ? void 0 : _a.node);
  return indexOf(node) < highestBlockingIndex;
}
function addLayer(layer) {
  layers.push(layer);
}
function removeLayer(node) {
  const index = indexOf(node);
  if (index < 0) {
    return;
  }
  layers.splice(index, 1);
}
function assignPointerEventToLayers() {
  for (const {
    node
  } of layers) {
    node.style.pointerEvents = isBelowPointerBlockingLayer(node) ? "none" : "auto";
  }
}
function disableBodyPointerEvents(node) {
  if (hasPointerBlockingLayer() && !hasDisabledBodyPointerEvents) {
    const ownerDocument = getDocument(node);
    originalBodyPointerEvents = document.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = "none";
    hasDisabledBodyPointerEvents = true;
  }
}
function restoreBodyPointerEvents(node) {
  if (hasPointerBlockingLayer()) {
    return;
  }
  const ownerDocument = getDocument(node);
  ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
  if (ownerDocument.body.style.length === 0) {
    ownerDocument.body.removeAttribute("style");
  }
  hasDisabledBodyPointerEvents = false;
}
var layerStack = {
  layers,
  isTopMostLayer,
  hasPointerBlockingLayer,
  isBelowPointerBlockingLayer,
  addLayer,
  removeLayer,
  indexOf,
  find,
  assignPointerEventToLayers,
  disableBodyPointerEvents,
  restoreBodyPointerEvents
};
var AUTOFOCUS_ON_MOUNT_EVENT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT_EVENT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
var focusScopeStack = {
  /** A stack of focus scopes, with the active one at the top */
  stack: [],
  active() {
    return this.stack[0];
  },
  add(scope) {
    var _a;
    if (scope !== this.active()) {
      (_a = this.active()) == null ? void 0 : _a.pause();
    }
    this.stack = removeItemFromArray(this.stack, scope);
    this.stack.unshift(scope);
  },
  remove(scope) {
    var _a;
    this.stack = removeItemFromArray(this.stack, scope);
    (_a = this.active()) == null ? void 0 : _a.resume();
  }
};
function createFocusScope(props, ref) {
  const [isPaused, setIsPaused] = createSignal(false);
  const focusScope = {
    pause() {
      setIsPaused(true);
    },
    resume() {
      setIsPaused(false);
    }
  };
  let lastFocusedElement = null;
  const onMountAutoFocus = (e) => {
    var _a;
    return (_a = props.onMountAutoFocus) == null ? void 0 : _a.call(props, e);
  };
  const onUnmountAutoFocus = (e) => {
    var _a;
    return (_a = props.onUnmountAutoFocus) == null ? void 0 : _a.call(props, e);
  };
  const ownerDocument = () => getDocument(ref());
  const createSentinel = () => {
    const element = ownerDocument().createElement("span");
    element.setAttribute("data-focus-trap", "");
    element.tabIndex = 0;
    Object.assign(element.style, visuallyHiddenStyles);
    return element;
  };
  const tabbables = () => {
    const container = ref();
    if (!container) {
      return [];
    }
    return getAllTabbableIn(container, true).filter((el) => !el.hasAttribute("data-focus-trap"));
  };
  const firstTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[0] : null;
  };
  const lastTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[items.length - 1] : null;
  };
  const shouldPreventUnmountAutoFocus = () => {
    const container = ref();
    if (!container) {
      return false;
    }
    const activeElement = getActiveElement(container);
    if (!activeElement) {
      return false;
    }
    if (contains$1(container, activeElement)) {
      return false;
    }
    return isFocusable(activeElement);
  };
  createEffect(() => {
    if (isServer) {
      return;
    }
    const container = ref();
    if (!container) {
      return;
    }
    focusScopeStack.add(focusScope);
    const previouslyFocusedElement = getActiveElement(container);
    const hasFocusedCandidate = contains$1(container, previouslyFocusedElement);
    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT_EVENT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      container.dispatchEvent(mountEvent);
      if (!mountEvent.defaultPrevented) {
        setTimeout(() => {
          focusWithoutScrolling(firstTabbable());
          if (getActiveElement(container) === previouslyFocusedElement) {
            focusWithoutScrolling(container);
          }
        }, 0);
      }
    }
    onCleanup(() => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      setTimeout(() => {
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT_EVENT, EVENT_OPTIONS);
        if (shouldPreventUnmountAutoFocus()) {
          unmountEvent.preventDefault();
        }
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        container.dispatchEvent(unmountEvent);
        if (!unmountEvent.defaultPrevented) {
          focusWithoutScrolling(previouslyFocusedElement != null ? previouslyFocusedElement : ownerDocument().body);
        }
        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        focusScopeStack.remove(focusScope);
      }, 0);
    });
  });
  createEffect(() => {
    if (isServer) {
      return;
    }
    const container = ref();
    if (!container || !access$1(props.trapFocus) || isPaused()) {
      return;
    }
    const onFocusIn = (event) => {
      const target = event.target;
      if (target == null ? void 0 : target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (contains$1(container, target)) {
        lastFocusedElement = target;
      } else {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      const target = relatedTarget != null ? relatedTarget : getActiveElement(container);
      if (target == null ? void 0 : target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (!contains$1(container, target)) {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    ownerDocument().addEventListener("focusin", onFocusIn);
    ownerDocument().addEventListener("focusout", onFocusOut);
    onCleanup(() => {
      ownerDocument().removeEventListener("focusin", onFocusIn);
      ownerDocument().removeEventListener("focusout", onFocusOut);
    });
  });
  createEffect(() => {
    if (isServer) {
      return;
    }
    const container = ref();
    if (!container || !access$1(props.trapFocus) || isPaused()) {
      return;
    }
    const startSentinel = createSentinel();
    container.insertAdjacentElement("afterbegin", startSentinel);
    const endSentinel = createSentinel();
    container.insertAdjacentElement("beforeend", endSentinel);
    function onFocus(event) {
      const first = firstTabbable();
      const last = lastTabbable();
      if (event.relatedTarget === first) {
        focusWithoutScrolling(last);
      } else {
        focusWithoutScrolling(first);
      }
    }
    startSentinel.addEventListener("focusin", onFocus);
    endSentinel.addEventListener("focusin", onFocus);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.previousSibling === endSentinel) {
          endSentinel.remove();
          container.insertAdjacentElement("beforeend", endSentinel);
        }
        if (mutation.nextSibling === startSentinel) {
          startSentinel.remove();
          container.insertAdjacentElement("afterbegin", startSentinel);
        }
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: false
    });
    onCleanup(() => {
      startSentinel.removeEventListener("focusin", onFocus);
      endSentinel.removeEventListener("focusin", onFocus);
      startSentinel.remove();
      endSentinel.remove();
      observer.disconnect();
    });
  });
}
var DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer";
function createHideOutside(props) {
  createEffect(() => {
    if (access$1(props.isDisabled)) {
      return;
    }
    onCleanup(ariaHideOutside(access$1(props.targets), access$1(props.root)));
  });
}
var refCountMap = /* @__PURE__ */ new WeakMap();
var observerStack = [];
function ariaHideOutside(targets, root = document.body) {
  const visibleNodes = new Set(targets);
  const hiddenNodes = /* @__PURE__ */ new Set();
  const walk = (root2) => {
    for (const element of root2.querySelectorAll(`[${DATA_LIVE_ANNOUNCER_ATTR}], [${DATA_TOP_LAYER_ATTR}]`)) {
      visibleNodes.add(element);
    }
    const acceptNode = (node) => {
      if (visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") {
        return NodeFilter.FILTER_REJECT;
      }
      for (const target of visibleNodes) {
        if (node.contains(target)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    const walker = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, {
      acceptNode
    });
    const acceptRoot = acceptNode(root2);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
      hide2(root2);
    }
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker.nextNode();
      while (node != null) {
        hide2(node);
        node = walker.nextNode();
      }
    }
  };
  const hide2 = (node) => {
    var _a;
    const refCount = (_a = refCountMap.get(node)) != null ? _a : 0;
    if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return;
    }
    if (refCount === 0) {
      node.setAttribute("aria-hidden", "true");
    }
    hiddenNodes.add(node);
    refCountMap.set(node, refCount + 1);
  };
  if (observerStack.length) {
    observerStack[observerStack.length - 1].disconnect();
  }
  walk(root);
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0) {
        continue;
      }
      if (![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) {
        for (const node of change.removedNodes) {
          if (node instanceof Element) {
            visibleNodes.delete(node);
            hiddenNodes.delete(node);
          }
        }
        for (const node of change.addedNodes) {
          if ((node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true")) {
            visibleNodes.add(node);
          } else if (node instanceof Element) {
            walk(node);
          }
        }
      }
    }
  });
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  const observerWrapper = {
    observe() {
      observer.observe(root, {
        childList: true,
        subtree: true
      });
    },
    disconnect() {
      observer.disconnect();
    }
  };
  observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (const node of hiddenNodes) {
      const count = refCountMap.get(node);
      if (count == null) {
        return;
      }
      if (count === 1) {
        node.removeAttribute("aria-hidden");
        refCountMap.delete(node);
      } else {
        refCountMap.set(node, count - 1);
      }
    }
    if (observerWrapper === observerStack[observerStack.length - 1]) {
      observerStack.pop();
      if (observerStack.length) {
        observerStack[observerStack.length - 1].observe();
      }
    } else {
      observerStack.splice(observerStack.indexOf(observerWrapper), 1);
    }
  };
}
var POINTER_DOWN_OUTSIDE_EVENT = "interactOutside.pointerDownOutside";
var FOCUS_OUTSIDE_EVENT = "interactOutside.focusOutside";
function createInteractOutside(props, ref) {
  let pointerDownTimeoutId;
  let clickHandler = noop;
  const ownerDocument = () => getDocument(ref());
  const onPointerDownOutside = (e) => {
    var _a;
    return (_a = props.onPointerDownOutside) == null ? void 0 : _a.call(props, e);
  };
  const onFocusOutside = (e) => {
    var _a;
    return (_a = props.onFocusOutside) == null ? void 0 : _a.call(props, e);
  };
  const onInteractOutside = (e) => {
    var _a;
    return (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, e);
  };
  const isEventOutside = (e) => {
    var _a;
    const target = e.target;
    if (!(target instanceof Element)) {
      return false;
    }
    if (target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
      return false;
    }
    if (!contains$1(ownerDocument(), target)) {
      return false;
    }
    if (contains$1(ref(), target)) {
      return false;
    }
    return !((_a = props.shouldExcludeElement) == null ? void 0 : _a.call(props, target));
  };
  const onPointerDown = (e) => {
    function handler() {
      const container = ref();
      const target = e.target;
      if (!container || !target || !isEventOutside(e)) {
        return;
      }
      const handler2 = composeEventHandlers([onPointerDownOutside, onInteractOutside]);
      target.addEventListener(POINTER_DOWN_OUTSIDE_EVENT, handler2, {
        once: true
      });
      const pointerDownOutsideEvent = new CustomEvent(POINTER_DOWN_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: e,
          isContextMenu: e.button === 2 || isCtrlKey(e) && e.button === 0
        }
      });
      target.dispatchEvent(pointerDownOutsideEvent);
    }
    if (e.pointerType === "touch") {
      ownerDocument().removeEventListener("click", handler);
      clickHandler = handler;
      ownerDocument().addEventListener("click", handler, {
        once: true
      });
    } else {
      handler();
    }
  };
  const onFocusIn = (e) => {
    const container = ref();
    const target = e.target;
    if (!container || !target || !isEventOutside(e)) {
      return;
    }
    const handler = composeEventHandlers([onFocusOutside, onInteractOutside]);
    target.addEventListener(FOCUS_OUTSIDE_EVENT, handler, {
      once: true
    });
    const focusOutsideEvent = new CustomEvent(FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: e,
        isContextMenu: false
      }
    });
    target.dispatchEvent(focusOutsideEvent);
  };
  createEffect(() => {
    if (isServer) {
      return;
    }
    if (access$1(props.isDisabled)) {
      return;
    }
    pointerDownTimeoutId = window.setTimeout(() => {
      ownerDocument().addEventListener("pointerdown", onPointerDown, true);
    }, 0);
    ownerDocument().addEventListener("focusin", onFocusIn, true);
    onCleanup(() => {
      window.clearTimeout(pointerDownTimeoutId);
      ownerDocument().removeEventListener("click", clickHandler);
      ownerDocument().removeEventListener("pointerdown", onPointerDown, true);
      ownerDocument().removeEventListener("focusin", onFocusIn, true);
    });
  });
}
function createEscapeKeyDown(props) {
  const handleKeyDown = (event) => {
    if (event.key === EventKey.Escape) ;
  };
  createEffect(() => {
    var _a, _b;
    if (isServer) {
      return;
    }
    if (access$1(props.isDisabled)) {
      return;
    }
    const document2 = (_b = (_a = props.ownerDocument) == null ? void 0 : _a.call(props)) != null ? _b : getDocument();
    document2.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document2.removeEventListener("keydown", handleKeyDown);
    });
  });
}
var DismissableLayerContext = createContext();
function useOptionalDismissableLayerContext() {
  return useContext(DismissableLayerContext);
}
function DismissableLayer(props) {
  let ref;
  const parentContext = useOptionalDismissableLayerContext();
  const [local, others] = splitProps(props, ["ref", "disableOutsidePointerEvents", "excludedElements", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss", "bypassTopMostLayerCheck"]);
  const nestedLayers = /* @__PURE__ */ new Set([]);
  const registerNestedLayer = (element) => {
    nestedLayers.add(element);
    const parentUnregister = parentContext == null ? void 0 : parentContext.registerNestedLayer(element);
    return () => {
      nestedLayers.delete(element);
      parentUnregister == null ? void 0 : parentUnregister();
    };
  };
  const shouldExcludeElement = (element) => {
    {
      return false;
    }
  };
  const onPointerDownOutside = (e) => {
    {
      return;
    }
  };
  const onFocusOutside = (e) => {
    var _a, _b, _c;
    (_a = local.onFocusOutside) == null ? void 0 : _a.call(local, e);
    (_b = local.onInteractOutside) == null ? void 0 : _b.call(local, e);
    if (!e.defaultPrevented) {
      (_c = local.onDismiss) == null ? void 0 : _c.call(local);
    }
  };
  createInteractOutside({
    shouldExcludeElement,
    onPointerDownOutside,
    onFocusOutside
  }, () => ref);
  createEscapeKeyDown({
    ownerDocument: () => getDocument(ref),
    onEscapeKeyDown: (e) => {
      {
        return;
      }
    }
  });
  onMount(() => {
    {
      return;
    }
  });
  createEffect(on([() => ref, () => local.disableOutsidePointerEvents], ([ref2, disableOutsidePointerEvents]) => {
    if (!ref2) {
      return;
    }
    const layer = layerStack.find(ref2);
    if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
      layer.isPointerBlocking = disableOutsidePointerEvents;
      layerStack.assignPointerEventToLayers();
    }
    if (disableOutsidePointerEvents) {
      layerStack.disableBodyPointerEvents(ref2);
    }
    onCleanup(() => {
      layerStack.restoreBodyPointerEvents(ref2);
    });
  }, {
    defer: true
  }));
  const context = {
    registerNestedLayer
  };
  return createComponent(DismissableLayerContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps$1({
        as: "div"
      }, others));
    }
  });
}
function createDisclosureState(props = {}) {
  const [isOpen, setIsOpen] = createControllableBooleanSignal({
    value: () => access$1(props.open),
    defaultValue: () => !!access$1(props.defaultOpen),
    onChange: (value) => {
      var _a;
      return (_a = props.onOpenChange) == null ? void 0 : _a.call(props, value);
    }
  });
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    isOpen() ? close() : open();
  };
  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  };
}
function createTagName(ref, fallback) {
  const [tagName, setTagName] = createSignal(stringOrUndefined(fallback == null ? void 0 : fallback()));
  createEffect(() => {
    var _a;
    setTagName(((_a = ref()) == null ? void 0 : _a.tagName.toLowerCase()) || stringOrUndefined(fallback == null ? void 0 : fallback()));
  });
  return tagName;
}
function stringOrUndefined(value) {
  return isString(value) ? value : void 0;
}
var button_exports = {};
__export(button_exports, {
  Button: () => Button,
  Root: () => ButtonRoot
});
var BUTTON_INPUT_TYPES = ["button", "color", "file", "image", "reset", "submit"];
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") {
    return true;
  }
  if (tagName === "input" && element.type) {
    return BUTTON_INPUT_TYPES.indexOf(element.type) !== -1;
  }
  return false;
}
function ButtonRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    type: "button"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "type", "disabled"]);
  const tagName = createTagName(() => ref, () => "button");
  const isNativeButton = createMemo(() => {
    const elementTagName = tagName();
    if (elementTagName == null) {
      return false;
    }
    return isButton({
      tagName: elementTagName,
      type: local.type
    });
  });
  const isNativeInput = createMemo(() => {
    return tagName() === "input";
  });
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && (void 0 ) != null;
  });
  return createComponent(Polymorphic, mergeProps$1({
    as: "button",
    get type() {
      return isNativeButton() || isNativeInput() ? local.type : void 0;
    },
    get role() {
      return !isNativeButton() && !isNativeLink() ? "button" : void 0;
    },
    get tabIndex() {
      return !isNativeButton() && !isNativeLink() && !local.disabled ? 0 : void 0;
    },
    get disabled() {
      return isNativeButton() || isNativeInput() ? local.disabled : void 0;
    },
    get ["aria-disabled"]() {
      return !isNativeButton() && !isNativeInput() && local.disabled ? true : void 0;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    }
  }, others));
}
var Button = ButtonRoot;
var FORM_CONTROL_FIELD_PROP_NAMES = ["id", "aria-label", "aria-labelledby", "aria-describedby"];
function createFormControlField(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("field")
  }, props);
  createEffect(() => onCleanup(context.registerField(access$1(mergedProps.id))));
  return {
    fieldProps: {
      id: () => access$1(mergedProps.id),
      ariaLabel: () => access$1(mergedProps["aria-label"]),
      ariaLabelledBy: () => context.getAriaLabelledBy(access$1(mergedProps.id), access$1(mergedProps["aria-label"]), access$1(mergedProps["aria-labelledby"])),
      ariaDescribedBy: () => context.getAriaDescribedBy(access$1(mergedProps["aria-describedby"]))
    }
  };
}
function FormControlLabel(props) {
  let ref;
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const tagName = createTagName(() => ref, () => "label");
  createEffect(() => onCleanup(context.registerLabel(others.id)));
  return createComponent(Polymorphic, mergeProps$1({
    as: "label",
    get ["for"]() {
      return tagName() === "label" ? context.fieldId() : void 0;
    }
  }, () => context.dataset(), others));
}
function createFormResetListener(element, handler) {
  createEffect(on(element, (element2) => {
    if (element2 == null) {
      return;
    }
    const form = getClosestForm(element2);
    if (form == null) {
      return;
    }
    form.addEventListener("reset", handler, {
      passive: true
    });
    onCleanup(() => {
      form.removeEventListener("reset", handler);
    });
  }));
}
function getClosestForm(element) {
  return isFormElement(element) ? element.form : element.closest("form");
}
function isFormElement(element) {
  return element.matches("textarea, input, select, button");
}
function FormControlErrorMessage(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("error-message")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  const isInvalid = () => context.validationState() === "invalid";
  createEffect(() => {
    if (!isInvalid()) {
      return;
    }
    onCleanup(context.registerErrorMessage(others.id));
  });
  return createComponent(Show, {
    get when() {
      return local.forceMount || isInvalid();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps$1({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
var access = (v) => typeof v === "function" ? v() : v;
var contains = (wrapper, target) => {
  var _a;
  if (wrapper.contains(target)) return true;
  let currentElement = target;
  while (currentElement) {
    if (currentElement === wrapper) return true;
    currentElement = (_a = currentElement._$host) != null ? _a : currentElement.parentElement;
  }
  return false;
};
var activeStyles = /* @__PURE__ */ new Map();
var createStyle = (props) => {
  createEffect(() => {
    var _a, _b;
    const style = (_a = access(props.style)) != null ? _a : {};
    const properties = (_b = access(props.properties)) != null ? _b : [];
    const originalStyles = {};
    for (const key in style) {
      originalStyles[key] = props.element.style[key];
    }
    const activeStyle = activeStyles.get(props.key);
    if (activeStyle) {
      activeStyle.activeCount++;
    } else {
      activeStyles.set(props.key, {
        activeCount: 1,
        originalStyles,
        properties: properties.map((property) => property.key)
      });
    }
    Object.assign(props.element.style, props.style);
    for (const property of properties) {
      props.element.style.setProperty(property.key, property.value);
    }
    onCleanup(() => {
      var _a2;
      const activeStyle2 = activeStyles.get(props.key);
      if (!activeStyle2) return;
      if (activeStyle2.activeCount !== 1) {
        activeStyle2.activeCount--;
        return;
      }
      activeStyles.delete(props.key);
      for (const [key, value] of Object.entries(activeStyle2.originalStyles)) {
        props.element.style[key] = value;
      }
      for (const property of activeStyle2.properties) {
        props.element.style.removeProperty(property);
      }
      if (props.element.style.length === 0) {
        props.element.removeAttribute("style");
      }
      (_a2 = props.cleanup) == null ? void 0 : _a2.call(props);
    });
  });
};
var style_default = createStyle;
var getScrollDimensions = (element, axis) => {
  switch (axis) {
    case "x":
      return [element.clientWidth, element.scrollLeft, element.scrollWidth];
    case "y":
      return [element.clientHeight, element.scrollTop, element.scrollHeight];
  }
};
var isScrollContainer = (element, axis) => {
  const styles = getComputedStyle(element);
  const overflow = axis === "x" ? styles.overflowX : styles.overflowY;
  return overflow === "auto" || overflow === "scroll" || // The HTML element is a scroll container if it has overflow visible
  element.tagName === "HTML" && overflow === "visible";
};
var getScrollAtLocation = (location, axis, stopAt) => {
  var _a;
  const directionFactor = axis === "x" && window.getComputedStyle(location).direction === "rtl" ? -1 : 1;
  let currentElement = location;
  let availableScroll = 0;
  let availableScrollTop = 0;
  let wrapperReached = false;
  do {
    const [clientSize, scrollOffset, scrollSize] = getScrollDimensions(currentElement, axis);
    const scrolled = scrollSize - clientSize - directionFactor * scrollOffset;
    if ((scrollOffset !== 0 || scrolled !== 0) && isScrollContainer(currentElement, axis)) {
      availableScroll += scrolled;
      availableScrollTop += scrollOffset;
    }
    if (currentElement === (stopAt != null ? stopAt : document.documentElement)) {
      wrapperReached = true;
    } else {
      currentElement = (_a = currentElement._$host) != null ? _a : currentElement.parentElement;
    }
  } while (currentElement && !wrapperReached);
  return [availableScroll, availableScrollTop];
};
var [preventScrollStack, setPreventScrollStack] = createSignal([]);
var isActive = (id2) => preventScrollStack().indexOf(id2) === preventScrollStack().length - 1;
var createPreventScroll = (props) => {
  const defaultedProps = mergeProps({
    element: null,
    enabled: true,
    hideScrollbar: true,
    preventScrollbarShift: true,
    preventScrollbarShiftMode: "padding",
    restoreScrollPosition: true,
    allowPinchZoom: false
  }, props);
  const preventScrollId = createUniqueId();
  let currentTouchStart = [0, 0];
  let currentTouchStartAxis = null;
  let currentTouchStartDelta = null;
  createEffect(() => {
    if (!access(defaultedProps.enabled)) return;
    setPreventScrollStack((stack) => [...stack, preventScrollId]);
    onCleanup(() => {
      setPreventScrollStack((stack) => stack.filter((id2) => id2 !== preventScrollId));
    });
  });
  createEffect(() => {
    if (!access(defaultedProps.enabled) || !access(defaultedProps.hideScrollbar)) return;
    const {
      body
    } = document;
    const scrollbarWidth = window.innerWidth - body.offsetWidth;
    if (access(defaultedProps.preventScrollbarShift)) {
      const style = {
        overflow: "hidden"
      };
      const properties = [];
      if (scrollbarWidth > 0) {
        if (access(defaultedProps.preventScrollbarShiftMode) === "padding") {
          style.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${scrollbarWidth}px)`;
        } else {
          style.marginRight = `calc(${window.getComputedStyle(body).marginRight} + ${scrollbarWidth}px)`;
        }
        properties.push({
          key: "--scrollbar-width",
          value: `${scrollbarWidth}px`
        });
      }
      const offsetTop = window.scrollY;
      const offsetLeft = window.scrollX;
      style_default({
        key: "prevent-scroll",
        element: body,
        style,
        properties,
        cleanup: () => {
          if (access(defaultedProps.restoreScrollPosition) && scrollbarWidth > 0) {
            window.scrollTo(offsetLeft, offsetTop);
          }
        }
      });
    } else {
      style_default({
        key: "prevent-scroll",
        element: body,
        style: {
          overflow: "hidden"
        }
      });
    }
  });
  createEffect(() => {
    if (!isActive(preventScrollId) || !access(defaultedProps.enabled)) return;
    document.addEventListener("wheel", maybePreventWheel, {
      passive: false
    });
    document.addEventListener("touchstart", logTouchStart, {
      passive: false
    });
    document.addEventListener("touchmove", maybePreventTouch, {
      passive: false
    });
    onCleanup(() => {
      document.removeEventListener("wheel", maybePreventWheel);
      document.removeEventListener("touchstart", logTouchStart);
      document.removeEventListener("touchmove", maybePreventTouch);
    });
  });
  const logTouchStart = (event) => {
    currentTouchStart = getTouchXY(event);
    currentTouchStartAxis = null;
    currentTouchStartDelta = null;
  };
  const maybePreventWheel = (event) => {
    const target = event.target;
    const wrapper = access(defaultedProps.element);
    const delta = getDeltaXY(event);
    const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
    const axisDelta = axis === "x" ? delta[0] : delta[1];
    const resultsInScroll = wouldScroll(target, axis, axisDelta, wrapper);
    let shouldCancel;
    if (wrapper && contains(wrapper, target)) {
      shouldCancel = !resultsInScroll;
    } else {
      shouldCancel = true;
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
  const maybePreventTouch = (event) => {
    const wrapper = access(defaultedProps.element);
    const target = event.target;
    let shouldCancel;
    if (event.touches.length === 2) {
      shouldCancel = !access(defaultedProps.allowPinchZoom);
    } else {
      if (currentTouchStartAxis == null || currentTouchStartDelta === null) {
        const delta = getTouchXY(event).map((touch, i) => currentTouchStart[i] - touch);
        const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
        currentTouchStartAxis = axis;
        currentTouchStartDelta = axis === "x" ? delta[0] : delta[1];
      }
      if (target.type === "range") {
        shouldCancel = false;
      } else {
        const wouldResultInScroll = wouldScroll(target, currentTouchStartAxis, currentTouchStartDelta, wrapper);
        if (wrapper && contains(wrapper, target)) {
          shouldCancel = !wouldResultInScroll;
        } else {
          shouldCancel = true;
        }
      }
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
};
var getDeltaXY = (event) => [event.deltaX, event.deltaY];
var getTouchXY = (event) => event.changedTouches[0] ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
var wouldScroll = (target, axis, delta, wrapper) => {
  const targetInWrapper = wrapper !== null && contains(wrapper, target);
  const [availableScroll, availableScrollTop] = getScrollAtLocation(target, axis, targetInWrapper ? wrapper : void 0);
  if (delta > 0 && Math.abs(availableScroll) <= 1) {
    return false;
  }
  if (delta < 0 && Math.abs(availableScrollTop) < 1) {
    return false;
  }
  return true;
};
var preventScroll_default = createPreventScroll;
var src_default$1 = preventScroll_default;
var createPresence = (props) => {
  const refStyles = createMemo(() => {
    const element = access(props.element);
    if (!element) return;
    return getComputedStyle(element);
  });
  const getAnimationName = () => {
    var _a, _b;
    return (_b = (_a = refStyles()) == null ? void 0 : _a.animationName) != null ? _b : "none";
  };
  const [presentState, setPresentState] = createSignal(access(props.show) ? "present" : "hidden");
  let animationName = "none";
  createEffect((prevShow) => {
    const show = access(props.show);
    untrack(() => {
      var _a;
      if (prevShow === show) return show;
      const prevAnimationName = animationName;
      const currentAnimationName = getAnimationName();
      if (show) {
        setPresentState("present");
      } else if (currentAnimationName === "none" || ((_a = refStyles()) == null ? void 0 : _a.display) === "none") {
        setPresentState("hidden");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (prevShow === true && isAnimating) {
          setPresentState("hiding");
        } else {
          setPresentState("hidden");
        }
      }
    });
    return show;
  });
  createEffect(() => {
    const element = access(props.element);
    if (!element) return;
    const handleAnimationStart = (event) => {
      if (event.target === element) {
        animationName = getAnimationName();
      }
    };
    const handleAnimationEnd = (event) => {
      const currentAnimationName = getAnimationName();
      const isCurrentAnimation = currentAnimationName.includes(event.animationName);
      if (event.target === element && isCurrentAnimation && presentState() === "hiding") {
        setPresentState("hidden");
      }
    };
    element.addEventListener("animationstart", handleAnimationStart);
    element.addEventListener("animationcancel", handleAnimationEnd);
    element.addEventListener("animationend", handleAnimationEnd);
    onCleanup(() => {
      element.removeEventListener("animationstart", handleAnimationStart);
      element.removeEventListener("animationcancel", handleAnimationEnd);
      element.removeEventListener("animationend", handleAnimationEnd);
    });
  });
  return {
    present: () => presentState() === "present" || presentState() === "hiding",
    state: presentState,
    setState: setPresentState
  };
};
var presence_default = createPresence;
var src_default = presence_default;
var select_exports = {};
__export(select_exports, {
  Arrow: () => PopperArrow,
  Content: () => SelectContent,
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  HiddenSelect: () => SelectHiddenSelect,
  Icon: () => SelectIcon,
  Item: () => ListboxItem,
  ItemDescription: () => ListboxItemDescription,
  ItemIndicator: () => ListboxItemIndicator,
  ItemLabel: () => ListboxItemLabel,
  Label: () => SelectLabel,
  Listbox: () => SelectListbox,
  Portal: () => SelectPortal,
  Root: () => SelectRoot,
  Section: () => ListboxSection,
  Select: () => Select,
  Trigger: () => SelectTrigger,
  Value: () => SelectValue,
  useSelectContext: () => useSelectContext
});
var SelectContext = createContext();
function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useSelectContext` must be used within a `Select` component");
  }
  return context;
}
function SelectContent(props) {
  let ref;
  const context = useSelectContext();
  const [local, others] = splitProps(props, ["ref", "style", "onCloseAutoFocus", "onFocusOutside"]);
  const onEscapeKeyDown = (e) => {
    context.close();
  };
  const onFocusOutside = (e) => {
    var _a;
    (_a = local.onFocusOutside) == null ? void 0 : _a.call(local, e);
    if (context.isOpen() && context.isModal()) {
      e.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => !(context.isOpen() && context.isModal()),
    targets: () => []
  });
  src_default$1({
    element: () => null,
    enabled: () => context.contentPresent() && context.preventScroll()
  });
  createFocusScope({
    trapFocus: () => context.isOpen() && context.isModal(),
    onMountAutoFocus: (e) => {
      e.preventDefault();
    },
    onUnmountAutoFocus: (e) => {
      var _a;
      (_a = local.onCloseAutoFocus) == null ? void 0 : _a.call(local, e);
      if (!e.defaultPrevented) {
        focusWithoutScrolling(context.triggerRef());
        e.preventDefault();
      }
    }
  }, () => ref);
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Popper.Positioner, {
        get children() {
          return createComponent(DismissableLayer, mergeProps$1({
            get disableOutsidePointerEvents() {
              return context.isModal() && context.isOpen();
            },
            get excludedElements() {
              return [context.triggerRef];
            },
            get style() {
              return combineStyle({
                "--kb-select-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                position: "relative"
              }, local.style);
            },
            onEscapeKeyDown,
            onFocusOutside,
            get onDismiss() {
              return context.close;
            }
          }, () => context.dataset(), others));
        }
      });
    }
  });
}
function SelectHiddenSelect(props) {
  const context = useSelectContext();
  return createComponent(HiddenSelectBase, mergeProps$1({
    get collection() {
      return context.listState().collection();
    },
    get selectionManager() {
      return context.listState().selectionManager();
    },
    get isOpen() {
      return context.isOpen();
    },
    get isMultiple() {
      return context.isMultiple();
    },
    get isVirtualized() {
      return context.isVirtualized();
    },
    focusTrigger: () => {
      var _a;
      return (_a = context.triggerRef()) == null ? void 0 : _a.focus();
    }
  }, props));
}
function SelectIcon(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    children: "\u25BC"
  }, props);
  return createComponent(Polymorphic, mergeProps$1({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}
function SelectLabel(props) {
  const context = useSelectContext();
  const [local, others] = splitProps(props, ["onClick"]);
  const onClick = (e) => {
    var _a;
    callHandler(e, local.onClick);
    if (!context.isDisabled()) {
      (_a = context.triggerRef()) == null ? void 0 : _a.focus();
    }
  };
  return createComponent(FormControlLabel, mergeProps$1({
    as: "span",
    onClick
  }, others));
}
function SelectListbox(props) {
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("listbox")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "onKeyDown"]);
  createEffect(() => onCleanup(context.registerListboxId(local.id)));
  const onKeyDown = (e) => {
    callHandler(e, local.onKeyDown);
    if (e.key === "Escape") {
      e.preventDefault();
    }
  };
  return createComponent(ListboxRoot, mergeProps$1({
    get id() {
      return local.id;
    },
    get state() {
      return context.listState();
    },
    get virtualized() {
      return context.isVirtualized();
    },
    get autoFocus() {
      return context.autoFocus();
    },
    shouldSelectOnPressUp: true,
    shouldFocusOnHover: true,
    get shouldFocusWrap() {
      return context.shouldFocusWrap();
    },
    get disallowTypeAhead() {
      return context.disallowTypeAhead();
    },
    get ["aria-labelledby"]() {
      return context.listboxAriaLabelledBy();
    },
    get renderItem() {
      return context.renderItem;
    },
    get renderSection() {
      return context.renderSection;
    },
    onKeyDown
  }, others));
}
function SelectPortal(props) {
  const context = useSelectContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
function SelectBase(props) {
  const defaultId = `select-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    selectionMode: "single",
    disallowEmptySelection: false,
    closeOnSelection: props.selectionMode === "single",
    allowDuplicateSelectionEvents: true,
    gutter: 8,
    sameWidth: true,
    modal: false
  }, props);
  const [local, popperProps, formControlProps, others] = splitProps(mergedProps, ["itemComponent", "sectionComponent", "open", "defaultOpen", "onOpenChange", "value", "defaultValue", "onChange", "placeholder", "options", "optionValue", "optionTextValue", "optionDisabled", "optionGroupChildren", "keyboardDelegate", "allowDuplicateSelectionEvents", "disallowEmptySelection", "closeOnSelection", "disallowTypeAhead", "shouldFocusWrap", "selectionBehavior", "selectionMode", "virtualized", "modal", "preventScroll", "forceMount"], ["getAnchorRect", "placement", "gutter", "shift", "flip", "slide", "overlap", "sameWidth", "fitViewport", "hideWhenDetached", "detachedPadding", "arrowPadding", "overflowPadding"], FORM_CONTROL_PROP_NAMES);
  const [triggerId, setTriggerId] = createSignal();
  const [valueId, setValueId] = createSignal();
  const [listboxId, setListboxId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [listboxRef, setListboxRef] = createSignal();
  const [listboxAriaLabelledBy, setListboxAriaLabelledBy] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(true);
  const getOptionValue = (option) => {
    const optionValue = local.optionValue;
    if (optionValue == null) {
      return String(option);
    }
    return String(isFunction(optionValue) ? optionValue(option) : option[optionValue]);
  };
  const flattenOptions = createMemo(() => {
    const optionGroupChildren = local.optionGroupChildren;
    if (optionGroupChildren == null) {
      return local.options;
    }
    return local.options.flatMap((item) => {
      var _a;
      return (_a = item[optionGroupChildren]) != null ? _a : item;
    });
  });
  const flattenOptionKeys = createMemo(() => {
    return flattenOptions().map((option) => getOptionValue(option));
  });
  const getOptionsFromValues = (values) => {
    return [...values].map((value) => flattenOptions().find((option) => getOptionValue(option) === value)).filter((option) => option != null);
  };
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => {
      var _a;
      return (_a = local.onOpenChange) == null ? void 0 : _a.call(local, isOpen);
    }
  });
  const listState = createListState({
    selectedKeys: () => {
      if (local.value != null) {
        return local.value.map(getOptionValue);
      }
      return local.value;
    },
    defaultSelectedKeys: () => {
      if (local.defaultValue != null) {
        return local.defaultValue.map(getOptionValue);
      }
      return local.defaultValue;
    },
    onSelectionChange: (selectedKeys) => {
      var _a;
      (_a = local.onChange) == null ? void 0 : _a.call(local, getOptionsFromValues(selectedKeys));
      if (local.closeOnSelection) {
        close();
      }
    },
    allowDuplicateSelectionEvents: () => access$1(local.allowDuplicateSelectionEvents),
    disallowEmptySelection: () => access$1(local.disallowEmptySelection),
    selectionBehavior: () => access$1(local.selectionBehavior),
    selectionMode: () => local.selectionMode,
    dataSource: () => {
      var _a;
      return (_a = local.options) != null ? _a : [];
    },
    getKey: () => local.optionValue,
    getTextValue: () => local.optionTextValue,
    getDisabled: () => local.optionDisabled,
    getSectionChildren: () => local.optionGroupChildren
  });
  const selectedOptions = createMemo(() => {
    return getOptionsFromValues(listState.selectionManager().selectedKeys());
  });
  const removeOptionFromSelection = (option) => {
    listState.selectionManager().toggleSelection(getOptionValue(option));
  };
  const {
    present: contentPresent
  } = src_default({
    show: () => local.forceMount || disclosureState.isOpen(),
    element: () => {
      var _a;
      return (_a = contentRef()) != null ? _a : null;
    }
  });
  const focusListbox = () => {
    const listboxEl = listboxRef();
    if (listboxEl) {
      focusWithoutScrolling(listboxEl);
    }
  };
  const open = (focusStrategy2) => {
    if (local.options.length <= 0) {
      return;
    }
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
    let focusedKey = listState.selectionManager().firstSelectedKey();
    if (focusedKey == null) {
      if (focusStrategy2 === "first") {
        focusedKey = listState.collection().getFirstKey();
      } else if (focusStrategy2 === "last") {
        focusedKey = listState.collection().getLastKey();
      }
    }
    focusListbox();
    listState.selectionManager().setFocused(true);
    listState.selectionManager().setFocusedKey(focusedKey);
  };
  const close = () => {
    disclosureState.close();
    listState.selectionManager().setFocused(false);
    listState.selectionManager().setFocusedKey(void 0);
  };
  const toggle = (focusStrategy2) => {
    if (disclosureState.isOpen()) {
      close();
    } else {
      open(focusStrategy2);
    }
  };
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(triggerRef, () => {
    const defaultSelectedKeys = local.defaultValue ? [...local.defaultValue].map(getOptionValue) : new Selection();
    listState.selectionManager().setSelectedKeys(defaultSelectedKeys);
  });
  const collator = createCollator({
    usage: "search",
    sensitivity: "base"
  });
  const delegate = createMemo(() => {
    const keyboardDelegate = access$1(local.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(listState.collection, void 0, collator);
  });
  const renderItem = (item) => {
    var _a;
    return (_a = local.itemComponent) == null ? void 0 : _a.call(local, {
      item
    });
  };
  const renderSection = (section) => {
    var _a;
    return (_a = local.sectionComponent) == null ? void 0 : _a.call(local, {
      section
    });
  };
  createEffect(on([flattenOptionKeys], ([flattenOptionKeys2]) => {
    const currentSelectedKeys = [...listState.selectionManager().selectedKeys()];
    const keysToKeep = currentSelectedKeys.filter((key) => flattenOptionKeys2.includes(key));
    listState.selectionManager().setSelectedKeys(keysToKeep);
  }, {
    defer: true
  }));
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    isDisabled: () => {
      var _a;
      return (_a = formControlContext.isDisabled()) != null ? _a : false;
    },
    isMultiple: () => access$1(local.selectionMode) === "multiple",
    isVirtualized: () => {
      var _a;
      return (_a = local.virtualized) != null ? _a : false;
    },
    isModal: () => {
      var _a;
      return (_a = local.modal) != null ? _a : false;
    },
    preventScroll: () => {
      var _a;
      return (_a = local.preventScroll) != null ? _a : context.isModal();
    },
    disallowTypeAhead: () => {
      var _a;
      return (_a = local.disallowTypeAhead) != null ? _a : false;
    },
    shouldFocusWrap: () => {
      var _a;
      return (_a = local.shouldFocusWrap) != null ? _a : false;
    },
    selectedOptions,
    contentPresent,
    autoFocus: focusStrategy,
    triggerRef,
    listState: () => listState,
    keyboardDelegate: delegate,
    triggerId,
    valueId,
    listboxId,
    listboxAriaLabelledBy,
    setListboxAriaLabelledBy,
    setTriggerRef,
    setContentRef,
    setListboxRef,
    open,
    close,
    toggle,
    placeholder: () => local.placeholder,
    renderItem,
    renderSection,
    removeOptionFromSelection,
    generateId: createGenerateId(() => access$1(formControlProps.id)),
    registerTriggerId: createRegisterId(setTriggerId),
    registerValueId: createRegisterId(setValueId),
    registerListboxId: createRegisterId(setListboxId)
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(SelectContext.Provider, {
        value: context,
        get children() {
          return createComponent(Popper, mergeProps$1({
            anchorRef: triggerRef,
            contentRef
          }, popperProps, {
            get children() {
              return createComponent(Polymorphic, mergeProps$1({
                as: "div",
                role: "group",
                get id() {
                  return access$1(formControlProps.id);
                }
              }, () => formControlContext.dataset(), dataset, others));
            }
          }));
        }
      });
    }
  });
}
function SelectRoot(props) {
  const [local, others] = splitProps(props, ["value", "defaultValue", "onChange", "multiple"]);
  const value = createMemo(() => {
    if (local.value != null) {
      return local.multiple ? local.value : [local.value];
    }
    return local.value;
  });
  const defaultValue = createMemo(() => {
    if (local.defaultValue != null) {
      return local.multiple ? local.defaultValue : [local.defaultValue];
    }
    return local.defaultValue;
  });
  const onChange = (value2) => {
    var _a, _b, _c;
    if (local.multiple) {
      (_a = local.onChange) == null ? void 0 : _a.call(local, value2 != null ? value2 : []);
    } else {
      (_c = local.onChange) == null ? void 0 : _c.call(local, (_b = value2[0]) != null ? _b : null);
    }
  };
  return createComponent(SelectBase, mergeProps$1({
    get value() {
      return value();
    },
    get defaultValue() {
      return defaultValue();
    },
    onChange,
    get selectionMode() {
      return local.multiple ? "multiple" : "single";
    }
  }, others));
}
function SelectTrigger(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("trigger")
  }, props);
  const [local, formControlFieldProps, others] = splitProps(mergedProps, ["ref", "disabled", "onPointerDown", "onClick", "onKeyDown", "onFocus", "onBlur"], FORM_CONTROL_FIELD_PROP_NAMES);
  const selectionManager = () => context.listState().selectionManager();
  const keyboardDelegate = () => context.keyboardDelegate();
  const isDisabled = () => local.disabled || context.isDisabled();
  const {
    fieldProps
  } = createFormControlField(formControlFieldProps);
  const {
    typeSelectHandlers
  } = createTypeSelect({
    keyboardDelegate,
    selectionManager,
    onTypeSelect: (key) => selectionManager().select(key)
  });
  const ariaLabelledBy = () => {
    return [context.listboxAriaLabelledBy(), context.valueId()].filter(Boolean).join(" ") || void 0;
  };
  const onPointerDown = (e) => {
    callHandler(e, local.onPointerDown);
    e.currentTarget.dataset.pointerType = e.pointerType;
    if (!isDisabled() && e.pointerType !== "touch" && e.button === 0) {
      e.preventDefault();
      context.toggle(true);
    }
  };
  const onClick = (e) => {
    callHandler(e, local.onClick);
    if (!isDisabled() && e.currentTarget.dataset.pointerType === "touch") {
      context.toggle(true);
    }
  };
  const onKeyDown = (e) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    callHandler(e, local.onKeyDown);
    if (isDisabled()) {
      return;
    }
    callHandler(e, typeSelectHandlers.onKeyDown);
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.stopPropagation();
        e.preventDefault();
        context.toggle("first");
        break;
      case "ArrowUp":
        e.stopPropagation();
        e.preventDefault();
        context.toggle("last");
        break;
      case "ArrowLeft": {
        e.preventDefault();
        if (context.isMultiple()) {
          return;
        }
        const firstSelectedKey = selectionManager().firstSelectedKey();
        const key = firstSelectedKey != null ? (_b = (_a = keyboardDelegate()).getKeyAbove) == null ? void 0 : _b.call(_a, firstSelectedKey) : (_d = (_c = keyboardDelegate()).getFirstKey) == null ? void 0 : _d.call(_c);
        if (key != null) {
          selectionManager().select(key);
        }
        break;
      }
      case "ArrowRight": {
        e.preventDefault();
        if (context.isMultiple()) {
          return;
        }
        const firstSelectedKey = selectionManager().firstSelectedKey();
        const key = firstSelectedKey != null ? (_f = (_e = keyboardDelegate()).getKeyBelow) == null ? void 0 : _f.call(_e, firstSelectedKey) : (_h = (_g = keyboardDelegate()).getFirstKey) == null ? void 0 : _h.call(_g);
        if (key != null) {
          selectionManager().select(key);
        }
        break;
      }
    }
  };
  const onFocus = (e) => {
    callHandler(e, local.onFocus);
    if (selectionManager().isFocused()) {
      return;
    }
    selectionManager().setFocused(true);
  };
  const onBlur = (e) => {
    callHandler(e, local.onBlur);
    if (context.isOpen()) {
      return;
    }
    selectionManager().setFocused(false);
  };
  createEffect(() => onCleanup(context.registerTriggerId(fieldProps.id())));
  createEffect(() => {
    context.setListboxAriaLabelledBy([fieldProps.ariaLabelledBy(), fieldProps.ariaLabel() && !fieldProps.ariaLabelledBy() ? fieldProps.id() : null].filter(Boolean).join(" ") || void 0);
  });
  return createComponent(ButtonRoot, mergeProps$1({
    get id() {
      return fieldProps.id();
    },
    get disabled() {
      return isDisabled();
    },
    "aria-haspopup": "listbox",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return context.isOpen() ? context.listboxId() : void 0;
    },
    get ["aria-label"]() {
      return fieldProps.ariaLabel();
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return fieldProps.ariaDescribedBy();
    },
    onPointerDown,
    onClick,
    onKeyDown,
    onFocus,
    onBlur
  }, () => context.dataset(), () => formControlContext.dataset(), others));
}
function SelectValue(props) {
  const formControlContext = useFormControlContext();
  const context = useSelectContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("value")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "children"]);
  const selectionManager = () => context.listState().selectionManager();
  const isSelectionEmpty = () => {
    const selectedKeys = selectionManager().selectedKeys();
    if (selectedKeys.size === 1 && selectedKeys.has("")) {
      return true;
    }
    return selectionManager().isEmpty();
  };
  createEffect(() => onCleanup(context.registerValueId(local.id)));
  return createComponent(Polymorphic, mergeProps$1({
    as: "span",
    get id() {
      return local.id;
    },
    get ["data-placeholder-shown"]() {
      return isSelectionEmpty() ? "" : void 0;
    }
  }, () => formControlContext.dataset(), others, {
    get children() {
      return createComponent(Show, {
        get when() {
          return !isSelectionEmpty();
        },
        get fallback() {
          return context.placeholder();
        },
        get children() {
          return createComponent(SelectValueChild, {
            state: {
              selectedOption: () => context.selectedOptions()[0],
              selectedOptions: () => context.selectedOptions(),
              remove: (option) => context.removeOptionFromSelection(option),
              clear: () => selectionManager().clearSelection()
            },
            get children() {
              return local.children;
            }
          });
        }
      });
    }
  }));
}
function SelectValueChild(props) {
  const resolvedChildren = children(() => {
    const body = props.children;
    return isFunction(body) ? body(props.state) : body;
  });
  return resolvedChildren();
}
var Select = Object.assign(SelectRoot, {
  Arrow: PopperArrow,
  Content: SelectContent,
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  HiddenSelect: SelectHiddenSelect,
  Icon: SelectIcon,
  Item: ListboxItem,
  ItemDescription: ListboxItemDescription,
  ItemIndicator: ListboxItemIndicator,
  ItemLabel: ListboxItemLabel,
  Label: SelectLabel,
  Listbox: SelectListbox,
  Portal: SelectPortal,
  Section: ListboxSection,
  Trigger: SelectTrigger,
  Value: SelectValue
});
const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[storage] Failed to set "${key}":`, e);
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};
function createStorageSignal(key, initialValue) {
  const [value, _setValue] = createSignal(storage.get(key, initialValue));
  function setValue(next) {
    _setValue(next);
    storage.set(key, value());
  }
  return [value, setValue];
}
const ThemeContext = createContext();
const ThemeProvider = (props) => {
  const [theme, setTheme] = createStorageSignal("theme", "system");
  const resolvedTheme = () => {
    const t = theme();
    if (t === "system") {
      if (isServer) return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  };
  createEffect(() => {
    if (isServer) return;
    const resolved = resolvedTheme();
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  });
  return createComponent(ThemeContext.Provider, {
    value: {
      theme,
      setTheme,
      resolvedTheme
    },
    get children() {
      return props.children;
    }
  });
};
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
const THEME_OPTIONS = [{
  value: "light",
  label: "Light",
  icon: () => createComponent(sun_default, {
    "class": "h-4 w-4"
  })
}, {
  value: "dark",
  label: "Dark",
  icon: () => createComponent(moon_default, {
    "class": "h-4 w-4"
  })
}, {
  value: "system",
  label: "System",
  icon: () => createComponent(monitor_default, {
    "class": "h-4 w-4"
  })
}];
function ThemeToggle() {
  const {
    theme,
    setTheme
  } = useTheme();
  return createComponent(Select, {
    get value() {
      return theme();
    },
    onChange: (val) => val && setTheme(val),
    get options() {
      return THEME_OPTIONS.map((o) => o.value);
    },
    itemComponent: (props) => {
      const opt = THEME_OPTIONS.find((o) => o.value === props.item.rawValue);
      return createComponent(Select.Item, {
        get item() {
          return props.item;
        },
        "class": "flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 outline-none data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-700",
        get children() {
          return [opt == null ? void 0 : opt.icon(), createComponent(Select.ItemLabel, {
            get children() {
              return opt == null ? void 0 : opt.label;
            }
          })];
        }
      });
    },
    get children() {
      return [createComponent(Select.Trigger, {
        "class": "flex items-center gap-1.5 px-2 py-1 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
        "aria-label": "Toggle theme",
        get children() {
          return [createComponent(Select.Value, {
            children: (state) => {
              const opt = THEME_OPTIONS.find((o) => o.value === state.selectedOption());
              return opt ? opt.icon() : createComponent(sun_default, {
                "class": "h-4 w-4"
              });
            }
          }), createComponent(chevron_down_default, {
            "class": "h-3.5 w-3.5 opacity-60"
          })];
        }
      }), createComponent(Select.Portal, {
        get children() {
          return createComponent(Select.Content, {
            "class": "z-50 min-w-[8rem] rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-1",
            get children() {
              return createComponent(Select.Listbox, {});
            }
          });
        }
      })];
    }
  });
}
const en = {
  // Nav
  "nav.characters": "Characters",
  "nav.crops": "Crops",
  "nav.recipes": "Recipes",
  "nav.festivals": "Festivals",
  "nav.events": "Events",
  "nav.guides": "Guides",
  "nav.lists": "Lists",
  "nav.bookmarks": "Bookmarks",
  "nav.home": "Home",
  "nav.about": "About",
  // Common
  "common.search": "Search",
  "common.filter": "Filter",
  "common.all": "All",
  "common.back": "Back",
  "common.season.spring": "Spring",
  "common.season.summer": "Summer",
  "common.season.fall": "Fall",
  "common.season.winter": "Winter",
  "common.loading": "Loading...",
  "common.notFound": "Not found",
  "common.bookmark": "Bookmark",
  "common.bookmarked": "Bookmarked",
  "common.removeBookmark": "Remove bookmark",
  "common.items": "items",
  // Landing
  "landing.title": "SoS: Friends of Mineral Town",
  "landing.subtitle": "Your complete companion for Story of Seasons: Friends of Mineral Town",
  "landing.explore": "Explore",
  // About
  "about.title": "About",
  "about.description": "A fan-made wiki and companion app for Story of Seasons: Friends of Mineral Town.",
  // Characters
  "characters.title": "Characters",
  "characters.subtitle": "All NPCs in Mineral Town",
  "characters.birthday": "Birthday",
  "characters.gifts.loved": "Loved Gifts",
  "characters.gifts.liked": "Liked Gifts",
  "characters.gifts.disliked": "Disliked Gifts",
  "characters.gifts.hated": "Hated Gifts",
  "characters.schedule": "Schedule",
  "characters.location": "Location",
  "characters.marriageable": "Marriageable",
  // Crops
  "crops.title": "Crops",
  "crops.subtitle": "Grow and harvest crops each season",
  "crops.buyPrice": "Buy Price",
  "crops.sellPrice": "Sell Price",
  "crops.days": "Days to grow",
  "crops.regrowDays": "Regrow days",
  "crops.season": "Season",
  "crops.source": "Source",
  // Recipes
  "recipes.title": "Recipes",
  "recipes.subtitle": "Cooking recipes and ingredients",
  "recipes.ingredients": "Ingredients",
  "recipes.effect": "Effect",
  "recipes.source": "Source",
  "recipes.category": "Category",
  "recipes.howToLearn": "How to learn",
  // Festivals
  "festivals.title": "Festivals",
  "festivals.subtitle": "Annual festivals in Mineral Town",
  "festivals.date": "Date",
  "festivals.location": "Location",
  "festivals.reward": "Reward",
  "festivals.activity": "Activity",
  // Events
  "events.title": "Events",
  "events.subtitle": "Heart events and story moments",
  "events.hearts": "Hearts required",
  "events.character": "Character",
  "events.trigger": "Trigger",
  // Guides
  "guides.title": "Guides",
  "guides.subtitle": "Tips and strategies",
  "guides.readTime": "min read",
  // Lists
  "lists.title": "Lists",
  "lists.subtitle": "Item lists and references",
  "lists.mines": "Mine Items",
  "lists.fish": "Fish",
  "lists.animals": "Animals",
  "lists.tools": "Tools",
  "lists.foraging": "Foraging",
  "lists.gifts": "Universal Gifts",
  // Bookmarks
  "bookmarks.title": "Bookmarks",
  "bookmarks.subtitle": "Your saved items",
  "bookmarks.empty": "No bookmarks yet",
  "bookmarks.clearAll": "Clear all"
};
const id = {
  // Nav
  "nav.characters": "Karakter",
  "nav.crops": "Tanaman",
  "nav.recipes": "Resep",
  "nav.festivals": "Festival",
  "nav.events": "Event",
  "nav.guides": "Panduan",
  "nav.lists": "Daftar",
  "nav.bookmarks": "Markah",
  "nav.home": "Beranda",
  "nav.about": "Tentang",
  // Common
  "common.search": "Cari",
  "common.filter": "Filter",
  "common.all": "Semua",
  "common.back": "Kembali",
  "common.season.spring": "Musim Semi",
  "common.season.summer": "Musim Panas",
  "common.season.fall": "Musim Gugur",
  "common.season.winter": "Musim Dingin",
  "common.loading": "Memuat...",
  "common.notFound": "Tidak ditemukan",
  "common.bookmark": "Tandai",
  "common.bookmarked": "Ditandai",
  "common.removeBookmark": "Hapus tanda",
  "common.items": "item",
  // Landing
  "landing.title": "SoS: Friends of Mineral Town",
  "landing.subtitle": "Panduan lengkap untuk Story of Seasons: Friends of Mineral Town",
  "landing.explore": "Jelajahi",
  // About
  "about.title": "Tentang",
  "about.description": "Aplikasi wiki dan panduan penggemar untuk Story of Seasons: Friends of Mineral Town.",
  // Characters
  "characters.title": "Karakter",
  "characters.subtitle": "Semua NPC di Mineral Town",
  "characters.birthday": "Ulang Tahun",
  "characters.gifts.loved": "Hadiah Favorit",
  "characters.gifts.liked": "Hadiah Disukai",
  "characters.gifts.disliked": "Hadiah Tidak Disukai",
  "characters.gifts.hated": "Hadiah Dibenci",
  "characters.schedule": "Jadwal",
  "characters.location": "Lokasi",
  "characters.marriageable": "Bisa Dinikahi",
  // Crops
  "crops.title": "Tanaman",
  "crops.subtitle": "Tanam dan panen setiap musim",
  "crops.buyPrice": "Harga Beli",
  "crops.sellPrice": "Harga Jual",
  "crops.days": "Hari untuk tumbuh",
  "crops.regrowDays": "Hari tumbuh kembali",
  "crops.season": "Musim",
  "crops.source": "Sumber",
  // Recipes
  "recipes.title": "Resep",
  "recipes.subtitle": "Resep masakan dan bahan-bahan",
  "recipes.ingredients": "Bahan-bahan",
  "recipes.effect": "Efek",
  "recipes.source": "Sumber",
  "recipes.category": "Kategori",
  "recipes.howToLearn": "Cara mendapatkan",
  // Festivals
  "festivals.title": "Festival",
  "festivals.subtitle": "Festival tahunan di Mineral Town",
  "festivals.date": "Tanggal",
  "festivals.location": "Lokasi",
  "festivals.reward": "Hadiah",
  "festivals.activity": "Aktivitas",
  // Events
  "events.title": "Event",
  "events.subtitle": "Heart event dan momen cerita",
  "events.hearts": "Hati yang dibutuhkan",
  "events.character": "Karakter",
  "events.trigger": "Pemicu",
  // Guides
  "guides.title": "Panduan",
  "guides.subtitle": "Tips dan strategi",
  "guides.readTime": "menit baca",
  // Lists
  "lists.title": "Daftar",
  "lists.subtitle": "Daftar item dan referensi",
  "lists.mines": "Item Tambang",
  "lists.fish": "Ikan",
  "lists.animals": "Hewan",
  "lists.tools": "Alat",
  "lists.foraging": "Hasil Hutan",
  "lists.gifts": "Hadiah Universal",
  // Bookmarks
  "bookmarks.title": "Markah",
  "bookmarks.subtitle": "Item yang tersimpan",
  "bookmarks.empty": "Belum ada markah",
  "bookmarks.clearAll": "Hapus semua"
};
const translations = {
  en,
  id
};
const I18nContext = createContext();
const I18nProvider = (props) => {
  const [lang, setLang] = createStorageSignal("locale", "id");
  const t = (key) => {
    var _a, _b;
    return (_b = (_a = translations[lang()][key]) != null ? _a : translations["id"][key]) != null ? _b : key;
  };
  return createComponent(I18nContext.Provider, {
    value: {
      lang,
      setLang,
      t
    },
    get children() {
      return props.children;
    }
  });
};
function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
var _tmpl$$1 = ["<button", ' type="button" aria-label="', '" title="', '" class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"><!--$-->', "<!--/--><!--$-->", "<!--/--></button>"];
function LanguageToggle() {
  const {
    lang,
    setLang
  } = useI18n();
  return ssr(_tmpl$$1, ssrHydrationKey(), `Switch language (current: ${lang() === "en" ? "English" : "Indonesia"})`, `Language: ${lang() === "en" ? "English" : "Indonesia"}`, escape(createComponent(globe_default, {
    "class": "h-4 w-4"
  })), lang() === "en" ? "ID" : "EN");
}
const BookmarksContext = createContext();
const BookmarkProvider = (props) => {
  const [bookmarks, setBookmarks] = createStorageSignal("sos-fomt-bookmarks", []);
  const toggle = (id2, category, name) => {
    const current = bookmarks();
    const exists = current.findIndex((b) => b.id === id2);
    if (exists >= 0) {
      setBookmarks(current.filter((b) => b.id !== id2));
    } else {
      setBookmarks([...current, {
        id: id2,
        category,
        name,
        savedAt: Date.now()
      }]);
    }
  };
  const isBookmarked = (id2) => bookmarks().some((b) => b.id === id2);
  const getAll = () => bookmarks();
  const getByCategory = (category) => bookmarks().filter((b) => b.category === category);
  return createComponent(BookmarksContext.Provider, {
    value: {
      toggle,
      isBookmarked,
      getAll,
      getByCategory
    },
    get children() {
      return props.children;
    }
  });
};
function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within a BookmarkProvider");
  return ctx;
}
var _tmpl$ = ["<span", ' class="flex-1">', "</span>"], _tmpl$2 = ["<nav", ' class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex items-center h-14 gap-4"><!--$-->', '<!--/--><div class="hidden md:block h-5 w-px bg-slate-200 dark:bg-slate-700"></div><ul class="hidden md:flex items-center gap-0.5 flex-1">', '</ul><div class="ml-auto flex items-center gap-2"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle menu"', ">", '</button></div></div><div class="', '"><ul class="flex flex-col gap-0.5 border-t border-slate-200 dark:border-slate-700 pt-2"><!--$-->', '<!--/--><li class="mt-1 pt-1 border-t border-slate-200 dark:border-slate-700">', "</li></ul></div></div></nav>"], _tmpl$3 = ["<li", ">", "</li>"], _tmpl$4 = ["<span", ' class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.1rem] h-[1.1rem] rounded-full bg-accent text-white text-[10px] font-bold px-0.5">', "</span>"], _tmpl$5 = ["<span", ' class="inline-flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold px-1.5 py-0.5">', "</span>"];
const NAV_LINKS = [{
  href: "/characters",
  labelKey: "nav.characters"
}, {
  href: "/crops",
  labelKey: "nav.crops"
}, {
  href: "/recipes",
  labelKey: "nav.recipes"
}, {
  href: "/festivals",
  labelKey: "nav.festivals"
}, {
  href: "/events",
  labelKey: "nav.events"
}, {
  href: "/guides",
  labelKey: "nav.guides"
}, {
  href: "/lists",
  labelKey: "nav.lists"
}];
function Nav() {
  const location = useLocation();
  const {
    t
  } = useI18n();
  const {
    getAll
  } = useBookmarks();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const isActive2 = (path) => path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(path + "/");
  const desktopLinkClass = (path) => `px-3 py-1.5 rounded-md text-sm transition-colors ${isActive2(path) ? "text-accent font-medium" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"}`;
  const mobileLinkClass = (path) => `flex items-center px-3 py-3 rounded-lg text-sm transition-colors ${isActive2(path) ? "text-accent font-medium bg-accent/5" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"}`;
  const bookmarkCount = () => getAll().length;
  return ssr(_tmpl$2, ssrHydrationKey(), escape(createComponent(A, {
    href: "/",
    "class": "flex-shrink-0 text-slate-900 dark:text-white font-bold text-sm sm:text-base tracking-tight hover:text-accent transition-colors",
    children: "SoS FoMT"
  })), escape(createComponent(For, {
    each: NAV_LINKS,
    children: (link) => ssr(_tmpl$3, ssrHydrationKey(), escape(createComponent(A, {
      get href() {
        return link.href;
      },
      get ["class"]() {
        return desktopLinkClass(link.href);
      },
      get children() {
        return t(link.labelKey);
      }
    })))
  })), escape(createComponent(LanguageToggle, {})), escape(createComponent(ThemeToggle, {})), escape(createComponent(A, {
    href: "/bookmarks",
    get ["class"]() {
      return `relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${isActive2("/bookmarks") ? "text-accent" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`;
    },
    get ["aria-label"]() {
      return t("nav.bookmarks");
    },
    get title() {
      return t("nav.bookmarks");
    },
    get children() {
      return [createComponent(heart_default, {
        "class": "h-5 w-5",
        fill: "currentColor"
      }), bookmarkCount() > 0 && ssr(_tmpl$4, ssrHydrationKey(), bookmarkCount() > 99 ? "99+" : escape(bookmarkCount()))];
    }
  })), ssrAttribute("aria-expanded", escape(menuOpen(), true), false), menuOpen() ? escape(createComponent(x_default, {
    "class": "h-5 w-5"
  })) : escape(createComponent(menu_default, {
    "class": "h-5 w-5"
  })), `md:hidden overflow-hidden transition-all duration-200 ${menuOpen() ? "max-h-screen pb-3" : "max-h-0"}`, escape(createComponent(For, {
    each: NAV_LINKS,
    children: (link) => ssr(_tmpl$3, ssrHydrationKey(), escape(createComponent(A, {
      get href() {
        return link.href;
      },
      get ["class"]() {
        return mobileLinkClass(link.href);
      },
      onClick: () => setMenuOpen(false),
      get children() {
        return t(link.labelKey);
      }
    })))
  })), escape(createComponent(A, {
    href: "/bookmarks",
    get ["class"]() {
      return mobileLinkClass("/bookmarks");
    },
    onClick: () => setMenuOpen(false),
    get children() {
      return [ssr(_tmpl$, ssrHydrationKey(), escape(t("nav.bookmarks"))), bookmarkCount() > 0 && ssr(_tmpl$5, ssrHydrationKey(), escape(bookmarkCount()))];
    }
  })));
}
function App() {
  return createComponent(ThemeProvider, {
    get children() {
      return createComponent(I18nProvider, {
        get children() {
          return createComponent(BookmarkProvider, {
            get children() {
              return createComponent(Router, {
                root: (props) => [createComponent(Nav, {}), createComponent(Suspense, {
                  get children() {
                    return props.children;
                  }
                })],
                get children() {
                  return createComponent(FileRoutes, {});
                }
              });
            }
          });
        }
      });
    }
  });
}

export { App as default };
//# sourceMappingURL=app-DgTcKwnz.mjs.map
