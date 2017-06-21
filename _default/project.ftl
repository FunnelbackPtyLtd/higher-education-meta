<#ftl encoding="utf-8" output_format="HTML" />
<#import "/share/stencils/libraries/base/base.ftl" as base />
<#import "/share/stencils/libraries/tabs/tabs.ftl" as tabs />
<#import "/share/stencils/libraries/facets/facets.ftl" as facets />
<#import "/share/stencils/libraries/base/history_cart.ftl" as history_cart />

<#import "courses.ftl" as courses />
<#import "people.ftl" as people />
<#import "video.ftl" as video />

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
  <nav class="row">
    <div class="col-md-12">
      <h2 class="sr-only">Tabs</h2>
      <@tabs.Tabs />
    </div>
  </nav>
</#macro>

<#macro Results>
  <section class="search-results" data-ng-show="isDisplayed('results')">
    <div class="container">
      <div class="row">

        <#local tabFacets = question.collection.configuration.value("stencils.tabs.facets.${(response.customData.stencilsTabsSelectedTab)!}", "") />
        <#if tabFacets?has_content>
          <div class="col-md-3 search-facets">

            <@base.CuratorExhibits position="left" />

            <div class="card search-refine">
              <div class="card-header bg-inverse text-white">
                <h3>Refine your results</h3>
              </div>
            </div>
            
            <@facets.Facets facets=tabFacets />
          </div>
        </#if>

        <div class="col-md-<#if tabFacets?has_content>9<#else>12</#if>">

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
          <@base.ResultList rootNamespace=.namespace />

          <@base.Paging />
        </div>
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

      <div class="card-block">
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
            <#if result.metaData["a"]??><div><strong>By:</strong> <span>${result.metaData["a"]!?split("|")?join(", ")}</span></div></#if>
            <#if result.metaData["p"]??><div><strong>Publisher:</strong> <span>${result.metaData["p"]!?split("|")?join(", ")}</span></div></#if>
          </div>
        </#if>
      </div>
    </div>
  </li>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
