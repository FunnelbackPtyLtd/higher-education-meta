<#ftl encoding="utf-8" output_format="HTML" />
<#import "/web/templates/modernui/funnelback_classic.ftl" as s/>
<#import "/web/templates/modernui/funnelback.ftl" as fb />

<#import "history_cart.ftl" as history_cart />
<#import "/share/stencils/libraries/base/client_includes.ftl" as client_includes />

<#-- These imports are required for the automatic template selection to work
  The various namespaces (e.g. 'video', 'facebook') need to be on the main scope -->
<#import "project.ftl" as project />
<#import "courses.ftl" as courses />
<#import "people.ftl" as people />
<#import "video.ftl" as video />
<#import "facebook.ftl" as facebook />
<#import "events.ftl" as events />

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="robots" content="nofollow,noindex">
  
  <link rel="stylesheet" href="/stencils/resources/he/v15.12/css/he.css">

  <link rel="stylesheet" href="/stencils/resources/thirdparty/bootstrap/v4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.0/css/all.css">

  <@client_includes.HTMLHeader />

  <title><@s.AfterSearchOnly>${question.query!}<@s.IfDefCGI name="query">,&nbsp;</@s.IfDefCGI></@s.AfterSearchOnly><@s.cfg>service_name</@s.cfg></title>

</head>
<body>

  <@client_includes.ContentHeader />

  <main class="funnelback">
    <h1 class="sr-only">Search</h1>

      <@project.SearchForm />

      <@s.AfterSearchOnly>
        <@project.Tabs />
        <@project.Results />
      </@s.AfterSearchOnly>
      <@history_cart.SearchHistory />
      <@history_cart.Cart />
  </main>

  <@client_includes.ContentFooter />

  <script src="/stencils/resources/thirdparty/jquery/v3.2.1/jquery-3.2.1.min.js"></script>
  <script src="/stencils/resources/thirdparty/popper/v1.12.3/umd/popper.min.js"></script>
  <script src="/stencils/resources/thirdparty/bootstrap/v4.0.0/js/bootstrap.min.js"></script>
  <script src="/stencils/resources/base/v15.24/js/base.js"></script>

  <script src="/stencils/resources/autocompletion/js/typeahead.bundle-0.11.1.min.js"></script>
  <script src="/stencils/resources/autocompletion/js/handlebars.min-v4.0.5.js"></script>
  <script src="/s/resources/${question.collection.id}/${question.profile}/js/typeahead.fb-2.6.js"></script>

  <@courses.AutoCompleteTemplate />
  <@people.AutoCompleteTemplate />

  <script>
    jQuery(document).ready( function() {
      setupDeferredImages();
      setupFacetLessMoreButtons(${question.getCurrentProfileConfig().get("stencils.faceted_navigation.max_displayed_categories")!"undefined"}, '.search-facet');

      <@project.AutoComplete />
    });
  </script>

  <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
    <@history_cart.CartTemplate />
    <@courses.CartTemplate />
    <script nomodule src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
    <#if question.profile?contains("_preview")>
      <script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-cart-0.1.js"></script>
      <script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-history-0.1.js"></script>
    <#else>
      <script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-cart-0.1.min.js"></script>
      <script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-history-0.1.min.js"></script>
    </#if>
    <@history_cart.Configuration />
  </#if>

</body>
</html>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
