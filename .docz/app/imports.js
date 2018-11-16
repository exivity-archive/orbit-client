export const imports = {
  'advancedUsage.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "advanced-usage" */ 'advancedUsage.mdx'),
  'collection.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "collection" */ 'collection.mdx'),
  'gettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "getting-started" */ 'gettingStarted.mdx'),
  'intro.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "intro" */ 'intro.mdx'),
  'record.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "record" */ 'record.mdx'),
}
