<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "tabs.ftl" as tabs />
<#import "facets.ftl" as facets />
<#import "history_cart.ftl" as history_cart />

<#import "twitter.ftl" as twitter />

<#macro SearchForm>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
    <h2 class="text-center">Search Funnelback University</h2>
      <@base.SearchForm>
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="input-group">
              <div class="input-group-addon"><span class="fa fa-search"></span></div>
              <input required name="query" id="query" title="Search query" type="search" autofocus value="${question.query!}" accesskey="q" class="form-control input-lg query">

              <div class="input-group-addon">
                <button type="submit" class="btn btn-primary">Search</button>
              </div>
            </div>

            <ul class="float-right list-inline">
              <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
                <li class="list-inline-item">
                  <small>
                    <a data-ng-class="{active: isDisplayed('cart'), disabled: cart.length < 1}" data-ng-click="toggleCart()" title="{{cart.length}} item(s) in your shortlist" href="#">
                      <span class="fa fa-star-o"></span> Shortlist (<span class="ng-cloak">{{cart.length}}</span><span data-ng-show>0</span>)
                    </a>
                  </small>
                </li>
                <li class="list-inline-item">
                  <small>
                    <a data-ng-class="{active: isDisplayed('history')}" data-ng-click="toggleHistory()" href="#">
                      <span class="fa fa-history"></span> History
                    </a>
                  </small>
                </li>
              </#if>
            </ul>

            <small class="float-left">Search powered by Funnelback</small>
          </div>
        </div>
      </@base.SearchForm>
    </div>
  </div>
</#macro>

<#macro Tabs>
  <nav class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h2 class="sr-only">Tabs</h2>
        <@tabs.Tabs />
      </div>
    </div>
  </nav>
</#macro>

<#macro Results>
  <section class="search-results" data-ng-show="isDisplayed('results')">
    <div class="container">
      <div class="row">

        <#local tabFacets = question.collection.configuration.value("stencils.tabs.facets.${(response.customData.stencilsTabsSelectedTab)!}", "") />

        <div class="col-md-<#if tabFacets?has_content>9<#else>12</#if>">

          <@base.BestBets />
          <@base.CuratorExhibits position="center" />

          <#if (response.resultPacket.resultsSummary.totalMatching)! != 0>
            <@base.LimitDropdown />
            <@base.SortDropdown />
          </#if>

          <@facets.SelectedFacetValues />

          <#if (response.resultPacket.spell)??>
            <div class="row search-spelling">
              <div class="col-md-12">
                <@base.Spelling />
              </div>
            </div>
          </#if>

          <#if (response.resultPacket.QSups)!?size gt 0>
            <div class="row search-blending">
              <div class="col-md-12">
                <@base.Blending />
              </div>
            </div>
          </#if>

          <div class="row search-counts text-muted">
            <div class="col-md-12">
              <@base.Counts />
            </div>
          </div>

          <@base.NoResults />
          <@base.ResultList nestedRank=3>
            <@fb.ExtraResults name="twitter">
              <li><h4 class="sr-only">Tweet results</h4></li>
              <li class="search-results-twitter">
                <div class="row">
                  <#list (response.resultPacket.results)![] as result>
                    <#-- Limit to only 3 Twitter cards -->
                    <#if result?index lt 3>
                      <div class="col-md-4">
                        <@twitter.TwitterCard result=result />
                      </div>
                    </#if>
                  </#list>
                </div>
              </li>
            </@fb.ExtraResults>
          </@base.ResultList>

          <@base.Paging />
        </div>

        <#if tabFacets?has_content>
          <div class="col-md-3 search-facets order-md-first order-lg-first order-xl-first">

            <@base.CuratorExhibits position="left" />

            <div class="card search-refine">
              <div class="card-header bg-dark text-white">
                <h3>Refine your results</h3>
              </div>
            </div>
            
            <@facets.Facets facets=tabFacets />
          </div>
        </#if>
      </div>

      <div class="row">
        <div class="col-md-12">
          <@base.ContextualNavigation />
        </div>
      </div>
    </div>
  </section>
</#macro>

<#macro Result result>
  <li class="search-result search-result-default">
    <div class="card">

      <div class="card-header">
        <h4>
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
            <@s.boldicize><@s.Truncate length=70>${result.title}</@s.Truncate></@s.boldicize>
          </a>
        </h4>
        <div class="card-subtitle text-muted">
          <cite><@s.cut cut="http://"><@s.boldicize>${result.displayUrl}</@s.boldicize></@s.cut></cite>
          <@history_cart.LastVisitedLink result=result/>
        </div>
      </div>

      <div class="card-body">
        <div class="card-text">
          <#if result.metaData["I"]??>
            <img class="img-fluid float-right deferred" alt="Thumbnail for ${result.title}" src="/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["I"]! />">
          </#if>

          <#if result.summary??>
            <#if result.date??><small class="text-muted">${result.date?date?string("d MMM yyyy")}:</small></#if>
            <@s.boldicize>${result.summary?no_esc}</@s.boldicize>
          </#if>
        </div>

        <#if result.metaData["a"]?? || result.metaData["p"]??>
          <div class="card-text search-metadata text-muted">
            <#if result.metaData["a"]??><div><strong>By:</strong> <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["a"]! /></span></div></#if>
            <#if result.metaData["p"]??><div><strong>Publisher:</strong> <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["p"]! /></span></div></#if>
          </div>
        </#if>
      </div>
    </div>
  </li>
</#macro>

<#macro AutoComplete>
  <#if question.collection.configuration.hasValue("stencils.auto-completion.datasets")>
    jQuery('#query').qc({
        program: '<@s.cfg>auto-completion.program</@s.cfg>',
        alpha: '<@s.cfg>auto-completion.alpha</@s.cfg>',
        show: '<@s.cfg>auto-completion.show</@s.cfg>',
        sort: '<@s.cfg>auto-completion.sort</@s.cfg>',
        length: '<@s.cfg>auto-completion.length</@s.cfg>',
        datasets:{
          <#list question.collection.configuration.value("stencils.auto-completion.datasets")!?split(",") as dataset>
            ${dataset}: {
                name: '${question.collection.configuration.value("stencils.auto-completion.datasets.${dataset}.name")!}',
                collection: '${question.collection.configuration.value("stencils.auto-completion.datasets.${dataset}.collection")!}',
                profile: '${question.collection.configuration.value("stencils.auto-completion.datasets.${dataset}.profile")!question.profile}',
                show: '${question.collection.configuration.value("stencils.auto-completion.datasets.${dataset}.show")!"10"}'
                <#if dataset != "organic">
                  , template: {
                    suggestion: jQuery('#auto-completion-${dataset}').text()
                  }
                </#if>
            }<#if dataset_has_next>,</#if>
          </#list>
        }
    });
  </#if>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
