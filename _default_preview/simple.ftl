<#ftl encoding="utf-8" output_format="HTML" />
<#import "/web/templates/modernui/funnelback_classic.ftl" as s/>
<#import "/web/templates/modernui/funnelback.ftl" as fb />

<#import "/share/stencils/libraries/base/history_cart.ftl" as history_cart />
<#import "/share/stencils/libraries/base/client_includes.ftl" as client_includes />

<#import "project.ftl" as project />

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
  <link rel="stylesheet" href="/stencils/resources/he/v15.8/css/he.css">

  <link rel="stylesheet" href="/stencils/resources/thirdparty/bootstrap/v4.0.0-alpha.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="/stencils/resources/thirdparty/font-awesome/v4.7.0/css/font-awesome.min.css">

  <@client_includes.HTMLHeader />

  <title><@s.AfterSearchOnly>${question.query!}<@s.IfDefCGI name="query">,&nbsp;</@s.IfDefCGI></@s.AfterSearchOnly><@s.cfg>service_name</@s.cfg></title>

</head>
<body>

  <@client_includes.ContentHeader />

  <main class="funnelback" <#if question.collection.configuration.valueAsBoolean("ui.modern.session")> data-ng-app="Funnelback" data-ng-controller="DefaultCtrl"</#if>>
    <h1 class="sr-only">Search</h1>

      <@project.SearchForm />

      <@s.AfterSearchOnly>
        <@project.Tabs />
        <@project.Results />
        <@history_cart.SearchHistory />
        <@history_cart.Cart />
      </@s.AfterSearchOnly>
  </main>

  <@client_includes.ContentFooter />

  <script src="/stencils/resources/thirdparty/jquery/v3.2.1/jquery-3.2.1.min.js"></script>
  <script src="/stencils/resources/thirdparty/tether/v1.3.3/js/tether.min.js"></script>
  <script src="/stencils/resources/thirdparty/bootstrap/v4.0.0-alpha.6/js/bootstrap.min.js"></script>
  <script src="/stencils/resources/base/v15.8/js/base.js"></script>

  <script>
    jQuery(document).ready( function() {
      setupDeferredImages();
      setupFacetLessMoreButtons(${question.collection.configuration.value("stencils.faceted_navigation.max_displayed_categories", "8")}, '.search-facets ul');
    });
  </script>

  <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
    <script src="${GlobalResourcesPrefix}thirdparty/angular-1.0.7/angular.js"></script>
    <script src="${GlobalResourcesPrefix}thirdparty/angular-1.0.7/angular-resource.js"></script>
    <script src="${GlobalResourcesPrefix}js/funnelback-session.js"></script>
  </#if>

</body>
</html>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
