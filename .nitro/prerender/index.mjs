import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import destr from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, setResponseStatus, getResponseHeader, setResponseHeaders, send, getRequestHeader, removeResponseHeader, createError, appendResponseHeader, setResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/ufo@1.6.3/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.10.0/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.10.0/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/unstorage@1.17.4_db0@0.3.4_ioredis@5.10.0/node_modules/unstorage/drivers/fs-lite.mjs';
import { digest } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///Users/daffa/daffa/sos-fomt/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/daffa/daffa/sos-fomt/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/daffa/daffa/sos-fomt"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/daffa/daffa/sos-fomt"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/daffa/daffa/sos-fomt/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/daffa/daffa/sos-fomt/.nitro/cache"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"298-hdW7/pL89QptiszdYCHH67XxLxs\"",
    "mtime": "2026-04-06T02:58:45.834Z",
    "size": 664,
    "path": "../../.output/public/favicon.ico"
  },
  "/_build/assets/Badge-DJECpFa4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2df-82J58pNvPL5coReu2A1jt/7J+d0\"",
    "mtime": "2026-04-06T02:58:45.878Z",
    "size": 735,
    "path": "../../.output/public/_build/assets/Badge-DJECpFa4.js"
  },
  "/_build/assets/BookmarkButton-jmkU_0iq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c4-lArmj+Hrxf5hmD3BY/rrmkzL2nE\"",
    "mtime": "2026-04-06T02:58:45.879Z",
    "size": 1220,
    "path": "../../.output/public/_build/assets/BookmarkButton-jmkU_0iq.js"
  },
  "/_build/assets/CategoryCard-pst2HyMw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"518-8ETVCSWdPmrMTijmO2ra5a+ho6I\"",
    "mtime": "2026-04-06T02:58:45.878Z",
    "size": 1304,
    "path": "../../.output/public/_build/assets/CategoryCard-pst2HyMw.js"
  },
  "/_build/assets/FilterTabs-aOUMqtw3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"514-3CwyQCwAi7KGVf2dsQNTMWDiyjA\"",
    "mtime": "2026-04-06T02:58:45.879Z",
    "size": 1300,
    "path": "../../.output/public/_build/assets/FilterTabs-aOUMqtw3.js"
  },
  "/_build/assets/Layout-o6dTgksh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"512-/K1kVNjdrPiqa10byFe1HF0VDYU\"",
    "mtime": "2026-04-06T02:58:45.834Z",
    "size": 1298,
    "path": "../../.output/public/_build/assets/Layout-o6dTgksh.js"
  },
  "/_build/assets/DataCard-Cbe4n5mP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7db-JqZmJF/TfkKNQPjrf9ZTaxAmqaY\"",
    "mtime": "2026-04-06T02:58:45.834Z",
    "size": 2011,
    "path": "../../.output/public/_build/assets/DataCard-Cbe4n5mP.js"
  },
  "/_build/assets/SearchBar-B_mpoj7w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4af-eEC/llLRKImAUG/VdCXCS90wrBM\"",
    "mtime": "2026-04-06T02:58:45.837Z",
    "size": 1199,
    "path": "../../.output/public/_build/assets/SearchBar-B_mpoj7w.js"
  },
  "/_build/assets/_...404_-DTGxjYVL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d8-qgffrzJ0JzFCNcE+UFURHyjOJSE\"",
    "mtime": "2026-04-06T02:58:45.837Z",
    "size": 984,
    "path": "../../.output/public/_build/assets/_...404_-DTGxjYVL.js"
  },
  "/_build/assets/_id_-BB-I6jFH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19d5-RQ+roSMV4ZEU47L7AXJGTUtg54Y\"",
    "mtime": "2026-04-06T02:58:45.837Z",
    "size": 6613,
    "path": "../../.output/public/_build/assets/_id_-BB-I6jFH.js"
  },
  "/_build/assets/_id_-DYm0VsFV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14fa-dh8W9/rzNZf/IVoctO2zF0IxcdA\"",
    "mtime": "2026-04-06T02:58:45.839Z",
    "size": 5370,
    "path": "../../.output/public/_build/assets/_id_-DYm0VsFV.js"
  },
  "/_build/assets/_id_-CsijeCm0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c8f-dg4jkMRZvgeAHq2FG+qdjhKdqus\"",
    "mtime": "2026-04-06T02:58:45.839Z",
    "size": 3215,
    "path": "../../.output/public/_build/assets/_id_-CsijeCm0.js"
  },
  "/_build/assets/_id_-CftUFdRe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"256d-SsNk5YKRQDkCWNTaIsdsIyH005g\"",
    "mtime": "2026-04-06T02:58:45.837Z",
    "size": 9581,
    "path": "../../.output/public/_build/assets/_id_-CftUFdRe.js"
  },
  "/_build/assets/_id_-DZzmF-2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"154f-qb2sC02YGUs/phNa0DZS+E2ejcQ\"",
    "mtime": "2026-04-06T02:58:45.840Z",
    "size": 5455,
    "path": "../../.output/public/_build/assets/_id_-DZzmF-2U.js"
  },
  "/_build/assets/about-D51Bo2ad.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15f8-78/uJPITq1PvoXSVsT53xaQStRE\"",
    "mtime": "2026-04-06T02:58:45.840Z",
    "size": 5624,
    "path": "../../.output/public/_build/assets/about-D51Bo2ad.js"
  },
  "/_build/assets/_id_-emJ7iJuZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13a1-Ww5WlUURAD1hBNwb8C8z4HnUQkM\"",
    "mtime": "2026-04-06T02:58:45.842Z",
    "size": 5025,
    "path": "../../.output/public/_build/assets/_id_-emJ7iJuZ.js"
  },
  "/_build/assets/bookmarks-qAHngjIv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d11-QFKTs2ZPsVIPdQWEZOwJAAlJDj4\"",
    "mtime": "2026-04-06T02:58:45.842Z",
    "size": 3345,
    "path": "../../.output/public/_build/assets/bookmarks-qAHngjIv.js"
  },
  "/_build/assets/bookmarks-1rVNYLDE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"260-00yyb4z4RjQRdVQAx0l8c4uQFYI\"",
    "mtime": "2026-04-06T02:58:45.843Z",
    "size": 608,
    "path": "../../.output/public/_build/assets/bookmarks-1rVNYLDE.js"
  },
  "/_build/assets/index-B2cihjpD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c1cc-pjqgbn+Xqnh2LRf7q5EdeORA5JE\"",
    "mtime": "2026-04-06T02:58:45.845Z",
    "size": 49612,
    "path": "../../.output/public/_build/assets/index-B2cihjpD.js"
  },
  "/_build/assets/components-CQeu6MBZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f32-nfzjycBOjflj906gW8prCfEyMSk\"",
    "mtime": "2026-04-06T02:58:45.843Z",
    "size": 36658,
    "path": "../../.output/public/_build/assets/components-CQeu6MBZ.js"
  },
  "/_build/assets/entry-client-BgGnYZ3z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10162-3fkE84d+5j/JGvNgGaF8DkaWNA8\"",
    "mtime": "2026-04-06T02:58:45.850Z",
    "size": 65890,
    "path": "../../.output/public/_build/assets/entry-client-BgGnYZ3z.css"
  },
  "/_build/assets/entry-client-CXBHk9ns.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ac5e-NgMNHFs3QqEpN92WMQm7Rnq5GWc\"",
    "mtime": "2026-04-06T02:58:45.845Z",
    "size": 109662,
    "path": "../../.output/public/_build/assets/entry-client-CXBHk9ns.js"
  },
  "/_build/assets/index-BFJJTYoz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77c6-fyhBWwFSuzamZNw8RFI2688Ht5M\"",
    "mtime": "2026-04-06T02:58:45.851Z",
    "size": 30662,
    "path": "../../.output/public/_build/assets/index-BFJJTYoz.js"
  },
  "/_build/assets/i18n-BgVVEV7n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176a-Cj+KqezCferIb2lkO9oy9tW+Wv8\"",
    "mtime": "2026-04-06T02:58:45.848Z",
    "size": 5994,
    "path": "../../.output/public/_build/assets/i18n-BgVVEV7n.js"
  },
  "/_build/assets/index-B7YqBxcx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"407b-Xm/iBF30BN/ewEZ+M3NoF1/oB1Q\"",
    "mtime": "2026-04-06T02:58:45.853Z",
    "size": 16507,
    "path": "../../.output/public/_build/assets/index-B7YqBxcx.js"
  },
  "/_build/assets/index-BJix9Wod.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"98e-S9plBh4OPR9dgu0CLiFdCpzV/fk\"",
    "mtime": "2026-04-06T02:58:45.854Z",
    "size": 2446,
    "path": "../../.output/public/_build/assets/index-BJix9Wod.js"
  },
  "/_build/assets/index-Bz0eYyBa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24e8-0jTtb2dl44vthhuQs1py6+oyceE\"",
    "mtime": "2026-04-06T02:58:45.855Z",
    "size": 9448,
    "path": "../../.output/public/_build/assets/index-Bz0eYyBa.js"
  },
  "/_build/assets/index-C246HGCV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a79-i8zhkRIAOdpotyrvEVWi5wGXxfw\"",
    "mtime": "2026-04-06T02:58:45.855Z",
    "size": 2681,
    "path": "../../.output/public/_build/assets/index-C246HGCV.js"
  },
  "/_build/assets/index-BMf26fTW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f1e5-eBQslDDSAbQEvbOvYscJiWraMxs\"",
    "mtime": "2026-04-06T02:58:45.854Z",
    "size": 61925,
    "path": "../../.output/public/_build/assets/index-BMf26fTW.js"
  },
  "/_build/assets/index-C7XFIfqc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c04-uSYl8CoIcllWiW7hD/ITpdd3338\"",
    "mtime": "2026-04-06T02:58:45.856Z",
    "size": 3076,
    "path": "../../.output/public/_build/assets/index-C7XFIfqc.js"
  },
  "/_build/assets/index-CTw2qpZo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"65aa-EeIwMnK94mLZwZPJXahfZfObNTE\"",
    "mtime": "2026-04-06T02:58:45.857Z",
    "size": 26026,
    "path": "../../.output/public/_build/assets/index-CTw2qpZo.js"
  },
  "/_build/assets/index-D5HuDtyr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"abc-95u7pJlaa87IBr1uWf1ZbUpdgEg\"",
    "mtime": "2026-04-06T02:58:45.858Z",
    "size": 2748,
    "path": "../../.output/public/_build/assets/index-D5HuDtyr.js"
  },
  "/_build/assets/index-DWOedmm5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"daf-0STf1KSXx9i0/qb0mcqgOwlbRvw\"",
    "mtime": "2026-04-06T02:58:45.857Z",
    "size": 3503,
    "path": "../../.output/public/_build/assets/index-DWOedmm5.js"
  },
  "/_build/assets/index-DidNwe_o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"acb-nlS2bEdl3aM/FF49Y7fJ+BQLMdI\"",
    "mtime": "2026-04-06T02:58:45.859Z",
    "size": 2763,
    "path": "../../.output/public/_build/assets/index-DidNwe_o.js"
  },
  "/_build/assets/index-JrT023x1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6e5-MDoc3dRJVzakT8BpRx65D2KxvHE\"",
    "mtime": "2026-04-06T02:58:45.859Z",
    "size": 1765,
    "path": "../../.output/public/_build/assets/index-JrT023x1.js"
  },
  "/_build/assets/outfits-BUfWmqf3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"150d-XAWP1mhR8yDihoiW2nYzVtC5qTw\"",
    "mtime": "2026-04-06T02:58:45.861Z",
    "size": 5389,
    "path": "../../.output/public/_build/assets/outfits-BUfWmqf3.js"
  },
  "/_build/assets/npc-gifts-eZx0yR69.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"268f-tqZpEnMdlfaJm8X7nFP/rjnkTMI\"",
    "mtime": "2026-04-06T02:58:45.862Z",
    "size": 9871,
    "path": "../../.output/public/_build/assets/npc-gifts-eZx0yR69.js"
  },
  "/_build/assets/plus-jakarta-sans-latin-400-normal-Dhut76fR.woff2": {
    "type": "font/woff2",
    "etag": "\"2e28-hMXXk+UajpOr8Zybk6s5J5tf2P0\"",
    "mtime": "2026-04-06T02:58:45.862Z",
    "size": 11816,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-400-normal-Dhut76fR.woff2"
  },
  "/_build/assets/index-I09TH7Kl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a14-dat87DG49o1Tr6LwzKq+IwA4+DQ\"",
    "mtime": "2026-04-06T02:58:45.860Z",
    "size": 2580,
    "path": "../../.output/public/_build/assets/index-I09TH7Kl.js"
  },
  "/_build/assets/plus-jakarta-sans-latin-500-normal-Bf-nb4oT.woff2": {
    "type": "font/woff2",
    "etag": "\"3018-dsjsZzG9DI+xBHAOHfz/B+8MvEE\"",
    "mtime": "2026-04-06T02:58:45.862Z",
    "size": 12312,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-500-normal-Bf-nb4oT.woff2"
  },
  "/_build/assets/locations-DOXVEdhl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27d3-3YuClpw7LPrvmhQsXXA91mVve/k\"",
    "mtime": "2026-04-06T02:58:45.860Z",
    "size": 10195,
    "path": "../../.output/public/_build/assets/locations-DOXVEdhl.js"
  },
  "/_build/assets/plus-jakarta-sans-latin-500-normal-DYtqi0QS.woff": {
    "type": "font/woff",
    "etag": "\"3efc-mCjhtyeY2oABJDFTlNQMwS1MBLk\"",
    "mtime": "2026-04-06T02:58:45.863Z",
    "size": 16124,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-500-normal-DYtqi0QS.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-400-normal-BDKaGhyp.woff": {
    "type": "font/woff",
    "etag": "\"3d70-VNhXjvpfK+YLXog08qPnpKYaiFs\"",
    "mtime": "2026-04-06T02:58:45.867Z",
    "size": 15728,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-400-normal-BDKaGhyp.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-600-normal-BR_Ojra4.woff": {
    "type": "font/woff",
    "etag": "\"3ed4-ZNje8jwPD6ZDnc1kaFboMGQNfWM\"",
    "mtime": "2026-04-06T02:58:45.865Z",
    "size": 16084,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-600-normal-BR_Ojra4.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-700-normal-DqEcQeE5.woff": {
    "type": "font/woff",
    "etag": "\"3f08-ifv1Mm53IcIobF8crmB2Mv5c3DU\"",
    "mtime": "2026-04-06T02:58:45.867Z",
    "size": 16136,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-700-normal-DqEcQeE5.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-700-normal-CfpNZvy6.woff2": {
    "type": "font/woff2",
    "etag": "\"2fd4-/Jmlm4l0JaCcX4ZFFDxDDO/KAls\"",
    "mtime": "2026-04-06T02:58:45.867Z",
    "size": 12244,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-700-normal-CfpNZvy6.woff2"
  },
  "/_build/assets/plus-jakarta-sans-latin-600-normal-DLTa1BUW.woff2": {
    "type": "font/woff2",
    "etag": "\"2f9c-0BLvu/4R3ZJV2rUaUbtY4whTF8g\"",
    "mtime": "2026-04-06T02:58:45.866Z",
    "size": 12188,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-600-normal-DLTa1BUW.woff2"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-400-normal-2ppkqaOR.woff": {
    "type": "font/woff",
    "etag": "\"3bd0-HWYmOiwXcA17noazPtTKxoW2DAU\"",
    "mtime": "2026-04-06T02:58:45.868Z",
    "size": 15312,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-400-normal-2ppkqaOR.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-400-normal-D127hM_v.woff2": {
    "type": "font/woff2",
    "etag": "\"2960-zkWntsZR0wzMKi8tP7n18OW/D6I\"",
    "mtime": "2026-04-06T02:58:45.869Z",
    "size": 10592,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-400-normal-D127hM_v.woff2"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-500-normal-9VZagAe1.woff2": {
    "type": "font/woff2",
    "etag": "\"2a70-txJOytSLNAqjdVZrVxWTCwlZlfY\"",
    "mtime": "2026-04-06T02:58:45.869Z",
    "size": 10864,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-500-normal-9VZagAe1.woff2"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-700-normal-8-d-IyIQ.woff": {
    "type": "font/woff",
    "etag": "\"3d00-yXeOEtrI/hhLmzPLXArwNRw3uqw\"",
    "mtime": "2026-04-06T02:58:45.872Z",
    "size": 15616,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-700-normal-8-d-IyIQ.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-600-normal-DQgPU_Cg.woff2": {
    "type": "font/woff2",
    "etag": "\"2a90-t9mL5qA+3ZNu2/m6YD0AkFwfVSI\"",
    "mtime": "2026-04-06T02:58:45.871Z",
    "size": 10896,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-600-normal-DQgPU_Cg.woff2"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-500-normal-CqEEAICU.woff": {
    "type": "font/woff",
    "etag": "\"3d04-q4sjvNAwMCfbJIyexe+BoK3349o\"",
    "mtime": "2026-04-06T02:58:45.870Z",
    "size": 15620,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-500-normal-CqEEAICU.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-600-normal-B0WRRYJ1.woff": {
    "type": "font/woff",
    "etag": "\"3cf8-6d/qcRYx7lX2QS6F2Wc2W9wRXNg\"",
    "mtime": "2026-04-06T02:58:45.870Z",
    "size": 15608,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-600-normal-B0WRRYJ1.woff"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-400-normal-B8TCSmUq.woff": {
    "type": "font/woff",
    "etag": "\"15dc-SnwByI/iycfub5wcRDAz0PT3nDw\"",
    "mtime": "2026-04-06T02:58:45.872Z",
    "size": 5596,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-400-normal-B8TCSmUq.woff"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-500-normal-CvE5C8T-.woff": {
    "type": "font/woff",
    "etag": "\"169c-bzkXbTh4ekcJh+PMvtMpjmhOCJc\"",
    "mtime": "2026-04-06T02:58:45.873Z",
    "size": 5788,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-500-normal-CvE5C8T-.woff"
  },
  "/_build/assets/plus-jakarta-sans-latin-ext-700-normal-BajbvANd.woff2": {
    "type": "font/woff2",
    "etag": "\"2b00-GHqQtsBsjvqpogAHgub4Ca+lR4M\"",
    "mtime": "2026-04-06T02:58:45.871Z",
    "size": 11008,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-latin-ext-700-normal-BajbvANd.woff2"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-400-normal-Cg2kxhWu.woff2": {
    "type": "font/woff2",
    "etag": "\"1000-sfxTfPCCxlxL1D7lvlpaHlRcowk\"",
    "mtime": "2026-04-06T02:58:45.873Z",
    "size": 4096,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-400-normal-Cg2kxhWu.woff2"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-600-normal-Y4VTTRme.woff2": {
    "type": "font/woff2",
    "etag": "\"1064-xMxYpBamfzD3Pt2MHZRr7aFnlno\"",
    "mtime": "2026-04-06T02:58:45.875Z",
    "size": 4196,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-600-normal-Y4VTTRme.woff2"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-700-normal-CV6qDkkj.woff2": {
    "type": "font/woff2",
    "etag": "\"10ac-c73WMx5My5OkFhzePP0TQ+j1ySU\"",
    "mtime": "2026-04-06T02:58:45.875Z",
    "size": 4268,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-700-normal-CV6qDkkj.woff2"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-500-normal-DiU8zqi-.woff2": {
    "type": "font/woff2",
    "etag": "\"10bc-G6Y/9Lb+KT9TMJ+xfb3UnQS0las\"",
    "mtime": "2026-04-06T02:58:45.873Z",
    "size": 4284,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-500-normal-DiU8zqi-.woff2"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-700-normal-BCh_uG_5.woff": {
    "type": "font/woff",
    "etag": "\"1690-HPGQTL6vEgbrZDXcLw92BsSdOjY\"",
    "mtime": "2026-04-06T02:58:45.875Z",
    "size": 5776,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-700-normal-BCh_uG_5.woff"
  },
  "/_build/assets/plus-jakarta-sans-vietnamese-600-normal-5YsyKbU1.woff": {
    "type": "font/woff",
    "etag": "\"1670-S7EHzNVVsX4RPSgnYxhFsZ5Mi4o\"",
    "mtime": "2026-04-06T02:58:45.874Z",
    "size": 5744,
    "path": "../../.output/public/_build/assets/plus-jakarta-sans-vietnamese-600-normal-5YsyKbU1.woff"
  },
  "/_build/assets/seeds-D8gxiPEL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"282a-8X8/wEWHOolJhMU4LMkjd8tHk0A\"",
    "mtime": "2026-04-06T02:58:45.877Z",
    "size": 10282,
    "path": "../../.output/public/_build/assets/seeds-D8gxiPEL.js"
  },
  "/_build/assets/shops-BtXfpwQo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14a6-Ucps2i2a6t/amtxYILxVlGZLrMU\"",
    "mtime": "2026-04-06T02:58:45.878Z",
    "size": 5286,
    "path": "../../.output/public/_build/assets/shops-BtXfpwQo.js"
  },
  "/_build/assets/rings-BvVO8Bmq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d17-gi5Pt1vPXLLPjq1Af7abyHtwuXY\"",
    "mtime": "2026-04-06T02:58:45.876Z",
    "size": 3351,
    "path": "../../.output/public/_build/assets/rings-BvVO8Bmq.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _L2Ijwm = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_PLNJuO = () => import('./chunks/virtual/entry.mjs').then(function (n) { return n.e; });

const handlers = [
  { route: '', handler: _L2Ijwm, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_PLNJuO, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { closePrerenderer, localFetch };
//# sourceMappingURL=index.mjs.map
