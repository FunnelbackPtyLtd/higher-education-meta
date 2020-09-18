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
            <span class="text-muted">${result.listMetadata["eventContact"]?first!}</span>
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

              <#if result.listMetadata?keys?seq_contains("eventStartTime")>
                <div class="text-center">
                  <small>
                    ${result.listMetadata["eventStartTime"]?first!}
                    <#if result.listMetadata?keys?seq_contains("eventEndTime")>
                      - ${result.listMetadata["eventEndTime"]?first!}
                    </#if>
                  </small>
                </div>
              </#if>
            </div>

            <div class="col-md-10">
              <#if result.listMetadata["image"]!?has_content>
                <img class="img-fluid float-right ml-3" alt="Thumbnail for ${result.title}" src="${result.listMetadata["image"][0]!}">
              </#if>

              <p><@s.boldicize>${result.summary?no_esc}</@s.boldicize></p>
              <#if result.listMetadata["eventCategory"]!?has_content>
                <span class="text-muted ml-2">Tags: <@s.boldicize>${result.listMetadata["eventCategory"]?join(", ")}</@s.boldicize></span><br>
              </#if>
              <#if result.listMetadata["eventAudience"]!?has_content>
                <span class="text-muted ml-2">For: <@s.boldicize>${result.listMetadata["eventAudience"]?join(", ")}</@s.boldicize></span>
              </#if>
            </div>
          </div>
        </div>
      </div>

      <#if result.listMetadata?keys?filter(key -> ["eventContactEmail", "eventContactPhone", "eventLocationUrl", "eventLocation"]?seq_contains(key))?size gt 0>
      <div class="card-footer">
        <div class="row">
          <#if result.listMetadata?keys?seq_contains("eventContactEmail")>
            <div class="col">
              <span class="fas fa-fw fa-info text-muted"></span>
              <a class="text-muted" href="mailto:${result.listMetadata["eventContactEmail"]?first!}">${result.listMetadata["eventContactEmail"]?first!}</a>
            </div>
          </#if>
          <#if result.listMetadata?keys?seq_contains("eventContactPhone")>
            <div class="col">
              <span class="fas fa-fw fa-phone text-muted"></span>
              <a class="text-muted" href="tel:${result.listMetadata["eventContactPhone"]?first!?url}">${result.listMetadata["eventContactPhone"]?first!}</a>
            </div>
          </#if>
        </div>
        <div class="row">
          <div class="col">
            <span class="fas fa-fw fa-map-marker-alt text-muted"></span>
            <#if result.listMetadata?keys?seq_contains("eventLocationUrl")>
              <a class="text-muted" href="${result.listMetadata["eventLocationUrl"]?first}" target="_blank">${result.listMetadata["eventLocation"]?first!}</a>
            <#else>
              <span class="text-muted">${result.listMetadata["eventLocation"]?first!}</span>
            </#if>
          </div>
        </div>
      </div>
      </#if>
      
    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
