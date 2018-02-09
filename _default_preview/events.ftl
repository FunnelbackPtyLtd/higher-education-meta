<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />

<#macro Result result>
  <li class="search-result search-result-event">
    <div class="card">
      <div class="card-body">

        <div class="card-title">
          <div class="float-right">
            <@history_cart.LastVisitedLink result=result/>
          </div>
          <h4>
            <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
              <@s.boldicize><@s.Truncate length=70>${result.title!}</@s.Truncate></@s.boldicize>
            </a>
          </h4>
          <div class="card-subtitle">
            <span class="text-muted">${result.metaData["stencilsEventContact"]!}</span>
          </div>
        </div>

        <div class="card-text">
          <div class="row no-gutters">
            <div class="col-md-2">
              <div class="search-event-date text-center">
                <div class="search-event-date-month">
                  ${result.date?string("MMM")?upper_case}
                </div>
                <div class="search-event-date-day">
                  ${result.date?string("dd")}
                </div>
              </div>

              <#if result.metaData["stencilsEventStartTime"]??>
                <div class="text-center">
                  <small>
                    ${result.metaData["stencilsEventStartTime"]!}
                    <#if result.metaData["stencilsEventEndTime"]??>
                      - ${result.metaData["stencilsEventEndTime"]!}
                    </#if>
                  </small>
                </div>
              </#if>
            </div>

            <div class="col-md-10">
              <#if result.metaData["I"]??>
                <img class="img-fluid float-right" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["I"]! />"> 
              </#if>

              <p><@s.boldicize>${result.summary?no_esc}</@s.boldicize></p>
              <span class="text-muted ml-2">Tags: <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["stencilsEventCategory"]! /></@s.boldicize></span><br>
              <span class="text-muted ml-2">For: <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["stencilsEventAudience"]! /></@s.boldicize></span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <#if result.metaData["stencilsEventContactEmail"]??>
            <div class="col">
              <span class="fa fa-info text-muted"></span>
              <a class="text-muted" href="mailto:${result.metaData["stencilsEventContactEmail"]!}">${result.metaData["stencilsEventContactEmail"]!}</a>
            </div>
          </#if>
          <#if result.metaData["stencilsEventContactPhone"]??>
            <div class="col">
              <span class="fa fa-phone text-muted"></span>
              <a class="text-muted" href="tel:${result.metaData["stencilsEventContactPhone"]!?url}">${result.metaData["stencilsEventContactPhone"]!}</a>
            </div>
          </#if>
        </div>
        <div class="row">
          <div class="col">
            <span class="fa fa-map-marker text-muted"></span>
            <#if result.metaData["stencilsEventLocationUrl"]??>
              <a class="text-muted" href="${result.metaData["stencilsEventLocationUrl"]}" target="_blank">${result.metaData["stencilsEventLocation"]!}</a>
            <#else>
              <span class="text-muted">${result.metaData["stencilsEventLocation"]!}</span>
            </#if>
          </div>
        </div>
      </div>

    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
