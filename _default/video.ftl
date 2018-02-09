<#ftl encoding="utf-8" output_format="HTML" />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result search-result-video">
    <div class="card">

      <div class="row no-gutters">
        <div class="col-md-3 my-auto">
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}" target="_blank">
            <img class="card-img img-fluid" alt="Thumbnail for ${result.title}" src="${result.metaData["I"]!}">
            
            <div class="card-img-overlay text-center">
              <span class="fa fa-play-circle-o fa-4x"></span>
              <#if result.metaData["stencilsVideoDurationPretty"]??>
                <span class="badge badge-default">${result.metaData["stencilsVideoDurationPretty"]!}</span>
              <#elseif result.metaData["stencilsVideoDuration"]??>
                <span class="badge badge-default">${result.metaData["stencilsVideoDuration"]!?number}s</span>
              </#if>
            </div>
          </a>
          
        </div>


        <div class="col-md-9">
          <div class="card-body">
            <div class="card-title">
              <h4>
                <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
                  <@s.boldicize><@s.Truncate length=70>${result.title}</@s.Truncate></@s.boldicize>
                </a>
              </h4>
              <div class="card-subtitle text-muted">
                <small>${result.date?date?string.short!} - Uploaded by ${result.metaData["stencilsVideoAuthor"]!"Unknown"}</small>
                <@history_cart.LastVisitedLink result=result/>
              </div>
            </div>

            <div class="card-text">
              <@s.boldicize><@s.Truncate length=70>${result.metaData["c"]!?no_esc}</@s.Truncate></@s.boldicize>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
