<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />

<#macro Result result>
  <li class="search-result search-result-event mb-3">
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
            <span class="text-muted">${result.metaData["eventContact"]!}</span>
          </div>
        </div>

        <div class="card-text">
          <div class="row no-gutters">
            <div class="col-md-2">
              <div class="search-event-date mx-auto mt-2 text-center">
                <div class="search-event-date-month">
                  ${result.date?string("MMM")?upper_case}
                </div>
                <div class="search-event-date-day pt-2">
                  ${result.date?string("dd")}
                </div>
              </div>

              <#if result.metaData["eventStartTime"]??>
                <div class="text-center">
                  <small>
                    ${result.metaData["eventStartTime"]!}
                    <#if result.metaData["eventEndTime"]??>
                      - ${result.metaData["eventEndTime"]!}
                    </#if>
                  </small>
                </div>
              </#if>
            </div>

            <div class="col-md-10">
              <#if result.metaData["image"]??>
                <img class="img-fluid float-right ml-3" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["image"]! />"> 
              </#if>

              <p><@s.boldicize>${result.summary?no_esc}</@s.boldicize></p>
              <#if result.metaData["eventCategory"]??>
                <span class="text-muted ml-2">Tags: <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["eventCategory"]! /></@s.boldicize></span><br>
              </#if>
              <#if result.metaData["eventAudience"]??>
                <span class="text-muted ml-2">For: <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["eventAudience"]! /></@s.boldicize></span>
              </#if>
            </div>
          </div>
        </div>
      </div>

      <#if result.metaData["eventContactEmail"]?? || result.metaData["eventContactPhone"]?? || result.metaData["eventLocationUrl"]?? || result.metaData["eventLocation"]??>
      <div class="card-footer">
        <div class="row">
          <#if result.metaData["eventContactEmail"]??>
            <div class="col">
              <span class="fas fa-fw fa-info text-muted"></span>
              <a class="text-muted" href="mailto:${result.metaData["eventContactEmail"]!}">${result.metaData["eventContactEmail"]!}</a>
            </div>
          </#if>
          <#if result.metaData["eventContactPhone"]??>
            <div class="col">
              <span class="fas fa-fw fa-phone text-muted"></span>
              <a class="text-muted" href="tel:${result.metaData["eventContactPhone"]!?url}">${result.metaData["eventContactPhone"]!}</a>
            </div>
          </#if>
        </div>
        <div class="row">
          <div class="col">
            <span class="fas fa-fw fa-map-marker-alt text-muted"></span>
            <#if result.metaData["eventLocationUrl"]??>
              <a class="text-muted" href="${result.metaData["eventLocationUrl"]}" target="_blank">${result.metaData["eventLocation"]!}</a>
            <#else>
              <span class="text-muted">${result.metaData["eventLocation"]!}</span>
            </#if>
          </div>
        </div>
      </div>
      </#if>
      
    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
