<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "tabs.ftl" as tabs />
<#import "facets.ftl" as facets />
<#import "history_cart.ftl" as history_cart />

<#import "twitter.ftl" as twitter />

<#macro SearchForm>
  <div class="jumbotron jumbotron-fluid mb-0">
    <div class="container">
    <h2 class="text-center mb-4">Search Funnelback University</h2>
      <@base.SearchForm>
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text border-0 pl-0"><span class="fas fa-search"></span></span>
              </div>
              <input required name="query" id="query" title="Search query" type="search" autofocus value="${question.query!}" accesskey="q" class="form-control">
              <div class="input-group-text border-0 pr-0">
                <button type="submit" class="btn btn-primary px-4">Search</button>
              </div>
            </div>

            <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
              <ul class="float-right list-inline">
                <li class="list-inline-item flb-cart-count"></li>
                <li class="list-inline-item">
                  <button type="button" tabindex="0" class="btn-link session-history-toggle">
                    <span class="fa fa-history"></span> History
                  </button>
                </li>
              </ul>
            </#if>

            <small class="float-left pt-1">Search powered by Funnelback</small>
          </div>
        </div>
      </@base.SearchForm>
    </div>
  </div>
</#macro>

<#macro Tabs>
  <nav class="tabs container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h2 class="sr-only">Tabs</h2>
        <@tabs.Tabs />
      </div>
    </div>
  </nav>
</#macro>

<#macro Results>
  <section class="search-results pt-3" id="search-results">
    <div class="container" id="search-results-content">
      <div class="row">

        <#local tabFacets = question.getCurrentProfileConfig().get("stencils.tabs.facets.${response.customData.stencilsTabsSelectedTab}")!>

        <div class="col-md-<#if tabFacets?has_content>9<#else>12</#if>">

          <@base.BestBets />
          <@base.CuratorExhibits position="center" />

          <#if (response.resultPacket.resultsSummary.totalMatching)! != 0>
            <@base.LimitDropdown />
            <@base.SortDropdown />
          </#if>

          <@facets.SelectedFacetValues />

          <#if (response.resultPacket.spell)??>
            <div class="row search-spelling mb-3">
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

          <div class="row search-counts text-muted mb-3">
            <div class="col-md-12">
              <@base.Counts />
            </div>
          </div>

          <@base.NoResults />
          <@base.ResultList nestedRank=3>
            <@fb.ExtraResults name="twitter">
              <li><h4 class="sr-only">Tweet results</h4></li>
              <li class="search-results-twitter">
                <div class="row mb-3">
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
          <div class="col-md-3 search-facets order-md-first order-lg-first order-xl-first mb-3">

            <@base.CuratorExhibits position="left" />

            <div class="card search-refine">
              <div class="card-header bg-dark text-white">
                <h3 class="mb-0">Refine your results</h3>
              </div>
            </div>
            
            <@facets.Facets facets=tabFacets />
          </div>
        </#if>
      </div>

      <div class="row mb-3">
        <div class="col-md-12">
          <@base.ContextualNavigation />
        </div>
      </div>
    </div>
  </section>
</#macro>

<#macro Result result>
  <li class="search-result search-result-default mb-3">
    <div class="card">

      <div class="card-header">
        <#switch result.fileType>
          <#case "pdf">
            <i class="far fa-file-pdf float-right text-muted" aria-hidden="true"></i>
            <#break>
          <#case "doc">
          <#case "docx">
          <#case "rtf">
            <i class="far fa-file-word float-right text-muted" aria-hidden="true"></i>
            <#break>
          <#case "xls">
          <#case "xlsx">
            <i class="far fa-file-excel float-right text-muted" aria-hidden="true"></i>
            <#break>
          <#case "ppt">
          <#case "pptx">
            <i class="far fa-file-powerpoint float-right text-muted" aria-hidden="true"></i>
            <#break>
        </#switch>

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
          <#if result.metaData["image"]??>
            <img class="img-fluid float-right ml-3 deferred" alt="Thumbnail for ${result.title}" src="/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["image"]! />">
          </#if>

          <#if result.summary??>
            <#if result.date??><small class="text-muted">${result.date?date?string("d MMM yyyy")}:</small></#if>
            <@s.boldicize>${result.summary?no_esc}</@s.boldicize>
          </#if>
        </div>

        <#if result.metaData["author"]?? || result.metaData["publisher"]??>
          <div class="card-text search-metadata mt-1 text-muted">
            <#if result.metaData["author"]??><div><strong>By:</strong> <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["author"]! /></span></div></#if>
            <#if result.metaData["publisher"]??><div><strong>Publisher:</strong> <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["publisher"]! /></span></div></#if>
          </div>
        </#if>
      </div>
    </div>
  </li>
</#macro>

<#macro AutoComplete>
  <#if (question.getCurrentProfileConfig().get("stencils.auto-completion.datasets")!"")?has_content>
    jQuery('#query').qc({
        program: '<@s.cfg>auto-completion.program</@s.cfg>',
        alpha: '<@s.cfg>auto-completion.alpha</@s.cfg>',
        show: '<@s.cfg>auto-completion.show</@s.cfg>',
        sort: '<@s.cfg>auto-completion.sort</@s.cfg>',
        length: '<@s.cfg>auto-completion.length</@s.cfg>',
        datasets:{
          <#list question.getCurrentProfileConfig().get("stencils.auto-completion.datasets")!?split(",") as dataset>
            ${dataset}: {
                name: '${question.getCurrentProfileConfig().get("stencils.auto-completion.datasets.${dataset}.name")!}',
                collection: '${question.getCurrentProfileConfig().get("stencils.auto-completion.datasets.${dataset}.collection")!}',
                profile: '${question.getCurrentProfileConfig().get("stencils.auto-completion.datasets.${dataset}.profile")!question.profile}',
                show: '${question.getCurrentProfileConfig().get("stencils.auto-completion.datasets.${dataset}.show")!"10"}'
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
