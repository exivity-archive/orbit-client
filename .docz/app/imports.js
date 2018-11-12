export const imports = {
  'collection.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "collection" */ 'collection.mdx'),
  'gettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "getting-started" */ 'gettingStarted.mdx'),
  'intro.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "intro" */ 'intro.mdx'),
  'record.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "record" */ 'record.mdx'),
}
