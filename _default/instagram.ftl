<#ftl encoding="utf-8" output_format="HTML" />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result instagram mb-3">
    <div class="card">
      <div class="row no-gutters">
        <div class="col-md-3 instagram">
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}" target="_blank">
            <#if result.metaData["instagramMediaType"]?? && (result.metaData["instagramMediaType"] == "IMAGE" || result.metaData["instagramMediaType"] == "CAROUSEL_ALBUM") && result.metaData["instagramMediaUrl"]??>
              <img class="card-img img-fluid" alt="Instagram Media Image" src="${result.metaData["instagramMediaUrl"]}">
            </#if>
            <#if (result.metaData["instagramMediaType"]!"") == "VIDEO" && result.metaData["instagramThumbnailUrl"]??>
              <img class="card-img img-fluid" alt="Instagram Video Thumbnail" src="${result.metaData["instagramThumbnailUrl"]}">
            </#if>
          </a>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <div class="card-text">
              <strong>${result.metaData["author"]!"Unknown"}</strong>&nbsp;
              <@s.boldicize><@s.Truncate length=500>${result.metaData["instagramCaption"]!}</@s.Truncate></@s.boldicize>
            </div>
            <div class="community-details">

              <#-- Like and comment count is only available in Graph API, not Basic Display API  -->
              <#-- Graph API requires more permissions to be approved in App Review -->
              <#if result.metaData["instagramLikesCount"]??>
                <i class="fa fa-heart"></i><span>  ${result.metaData["instagramLikesCount"]}</span>
              </#if>
              <#if result.metaData["instagramCommentsCount"]??>
                <i class="fa fa-comment"></i><span>  ${result.metaData["instagramCommentsCount"]}</span>
              </#if>

              <span>
                <#-- history_cart.ftl has ${prettyTime(session.getClickHistory(result.indexUrl).clickDate)} -->
                <time datetime="${result.date?date?string.iso}" title="${result.date?date?string.medium}">${prettyTime(result.date?date)}</time>
              </span>
              <@history_cart.LastVisitedLink result=result/>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>
