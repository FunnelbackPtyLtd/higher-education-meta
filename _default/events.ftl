<#ftl encoding="utf-8" output_format="HTML" />
<#import "/share/stencils/libraries/base/base.ftl" as base />

<#macro Result result>
  <li class="search-result search-result-event">
    <div class="card">
      <div class="card-block">

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
            <h5 class="text-muted">${result.metaData["eventContact"]!}</h5>
          </div>
          <div class="card-subtitle text-muted">
            <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["peopleDepartment"]! /></@s.boldicize>
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

              <#if result.metaData["eventStartTime"]??>
                <div class="text-center">
                  <small class="text-muted">
                    ${result.metaData["eventStartTime"]!}
                    <#if result.metaData["eventEndTime"]??>
                      - ${result.metaData["eventEndTime"]!}
                    </#if>
                  </small>
                </div>
              </#if>
            </div>

            <div class="col-md-10">
              <#if result.metaData["I"]??>
                <img class="img-fluid float-right" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["I"]! />">            
              </#if>

              <p>${result.summary?no_esc}</p>
              <span class="text-muted"><@base.MultiValuedMetadataDisplay metadata=result.metaData["eventCategory"]! /></span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="row">
          <#if result.metaData["eventContactEmail"]??>
            <div class="col">
              <span class="fa fa-info text-muted"></span>
              <a class="text-muted" href="mailto:${result.metaData["eventContactEmail"]!}">${result.metaData["eventContactEmail"]!}</a>
            </div>
          </#if>
          <#if result.metaData["eventContactPhone"]??>
            <div class="col">
              <span class="fa fa-phone text-muted"></span>
              <a class="text-muted" href="tel:result.metaData["eventContactPhone"]!">${result.metaData["eventContactPhone"]!}</a>
            </div>
          </#if>
        </div>
        <div class="row">
          <div class="col">
            <span class="fa fa-map-marker text-muted"></span>
            <#if result.metaData["eventLocationUrl"]??>
              <a class="text-muted" href="${result.metaData["eventLocationUrl"]}" target="_blank">${result.metaData["eventLocation"]!}</a>
            <#else>
              <span class="text-muted">${result.metaData["eventLocation"]!}</span>
            </#if>
          </div>
        </div>
      </div>

    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->