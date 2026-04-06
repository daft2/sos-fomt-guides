import { createComponent, isServer, ssr, ssrHydrationKey, escape, ssrAttribute, getRequestEvent, delegateEvents, ssrElement, mergeProps as mergeProps$1 } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/web/dist/server.js';
import { F as FileRoutes } from '../virtual/entry.mjs';
import { Suspense, createEffect, createSignal, For, createContext, onCleanup, useContext, mergeProps, splitProps, createMemo, children, getOwner, sharedConfig, createRenderEffect, on, runWithOwner, untrack, Show, createRoot, startTransition, resetErrorBoundaries, batch, createComponent as createComponent$1 } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/dist/server.js';
import 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/solid-js@1.9.11/node_modules/solid-js/web/storage/dist/storage.js';

function createBeforeLeave() {
  let listeners = /* @__PURE__ */ new Set();
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
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
    for (const l of listeners) l.listener({
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
  return asArray(routeDef.path).reduce((acc, originalPath) => {
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
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", stack = [], branches = []) {
  const routeDefs = asArray(routeDef);
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
        createRoot((dispose) => {
          disposers[i] = dispose;
          next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => {
            var _a;
            const routeMatches = props.routerState.matches();
            return (_a = routeMatches[i]) != null ? _a : routeMatches[0];
          });
        });
      }
    }
    disposers.splice(nextMatches.length).forEach((dispose) => dispose());
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
  const isActive = createMemo(() => {
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
        [props.inactiveClass]: !isActive()[0],
        [props.activeClass]: isActive()[0],
        ...rest.classList
      };
    },
    link: true,
    get ["aria-current"]() {
      return isActive()[1] ? "page" : void 0;
    }
  }), void 0, true);
}
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
var _tmpl$$2 = ["<button", ' type="button" aria-label="', '" title="', '" class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-100 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"><span class="text-base leading-none" aria-hidden="true">', "</span></button>"];
const ICONS = {
  light: "\u2600\uFE0F",
  dark: "\u{1F319}",
  system: "\u{1F4BB}"
};
const LABELS = {
  light: "Light",
  dark: "Dark",
  system: "System"
};
function ThemeToggle() {
  const {
    theme,
    setTheme
  } = useTheme();
  return ssr(_tmpl$$2, ssrHydrationKey(), `Switch theme (current: ${escape(LABELS[theme()], true)})`, `Theme: ${escape(LABELS[theme()], true)}`, escape(ICONS[theme()]));
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
var _tmpl$$1 = ["<button", ' type="button" aria-label="', '" title="', '" class="inline-flex items-center gap-1 w-9 h-9 justify-center rounded-lg text-gray-100 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 font-medium text-xs"><span class="leading-none">', "</span></button>"];
function LanguageToggle() {
  const {
    lang,
    setLang
  } = useI18n();
  return ssr(_tmpl$$1, ssrHydrationKey(), `Switch language (current: ${lang() === "en" ? "English" : "Indonesia"})`, `Language: ${lang() === "en" ? "English" : "Indonesia"}`, lang() === "en" ? "ID" : "EN");
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
var _tmpl$ = ["<span", ' class="text-xl leading-none">\u{1F33E}</span>'], _tmpl$2 = ["<span", ' class="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-green-200 transition-colors">SoS FoMT</span>'], _tmpl$3 = ["<svg", ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" aria-hidden="true"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg>'], _tmpl$4 = ["<span", ' class="flex-1">', "</span>"], _tmpl$5 = ["<nav", ' class="bg-green-800 dark:bg-slate-900 shadow-sm border-b border-green-900/30 dark:border-slate-700/50"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex items-center h-14 gap-4"><!--$-->', '<!--/--><div class="hidden md:block h-5 w-px bg-white/20"></div><ul class="hidden md:flex items-center gap-0.5 flex-1">', '</ul><div class="ml-auto flex items-center gap-1"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", '<!--/--><button class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Toggle menu"', '><span class="', '"></span><span class="', '"></span><span class="', '"></span></button></div></div><div class="', '"><ul class="flex flex-col gap-1 pt-1"><!--$-->', '<!--/--><li class="mt-1 pt-1 border-t border-white/10">', "</li></ul></div></div></nav>"], _tmpl$6 = ["<li", ">", "</li>"], _tmpl$7 = ["<span", ' class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.1rem] h-[1.1rem] rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold px-0.5">', "</span>"], _tmpl$8 = ["<span", ' class="inline-flex items-center justify-center rounded-full bg-amber-400 text-slate-900 text-xs font-bold px-1.5 py-0.5">', "</span>"];
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
  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(path + "/");
  const desktopLinkClass = (path) => `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive(path) ? "bg-white/20 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"}`;
  const mobileLinkClass = (path) => `flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(path) ? "bg-white/15 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"}`;
  const bookmarkCount = () => getAll().length;
  return ssr(_tmpl$5, ssrHydrationKey(), escape(createComponent(A, {
    href: "/",
    "class": "flex-shrink-0 flex items-center gap-2 group",
    get children() {
      return [ssr(_tmpl$, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey())];
    }
  })), escape(createComponent(For, {
    each: NAV_LINKS,
    children: (link) => ssr(_tmpl$6, ssrHydrationKey(), escape(createComponent(A, {
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
      return `relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${isActive("/bookmarks") ? "bg-white/20 text-white" : "text-green-100 hover:bg-white/10 hover:text-white"}`;
    },
    get ["aria-label"]() {
      return t("nav.bookmarks");
    },
    get title() {
      return t("nav.bookmarks");
    },
    get children() {
      return [ssr(_tmpl$3, ssrHydrationKey()), bookmarkCount() > 0 && ssr(_tmpl$7, ssrHydrationKey(), bookmarkCount() > 99 ? "99+" : escape(bookmarkCount()))];
    }
  })), ssrAttribute("aria-expanded", escape(menuOpen(), true), false), `block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${menuOpen() ? "translate-y-2 rotate-45" : ""}`, `block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen() ? "opacity-0" : ""}`, `block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${menuOpen() ? "-translate-y-2 -rotate-45" : ""}`, `md:hidden overflow-hidden transition-all duration-200 ${menuOpen() ? "max-h-screen pb-4" : "max-h-0"}`, escape(createComponent(For, {
    each: NAV_LINKS,
    children: (link) => ssr(_tmpl$6, ssrHydrationKey(), escape(createComponent(A, {
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
      return [ssr(_tmpl$4, ssrHydrationKey(), escape(t("nav.bookmarks"))), bookmarkCount() > 0 && ssr(_tmpl$8, ssrHydrationKey(), escape(bookmarkCount()))];
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
//# sourceMappingURL=app-BOwwvhi1.mjs.map
