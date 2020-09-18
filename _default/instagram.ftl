<#ftl encoding="utf-8" output_format="HTML" />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result instagram mb-3">
    <div class="card">
      <div class="row no-gutters">
        <div class="col-md-3 instagram">
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}" target="_blank">
            <#if result.listMetadata?keys?seq_contains("instagramMediaType") && (result.listMetadata["instagramMediaType"]?first == "IMAGE" || result.listMetadata["instagramMediaType"]?first == "CAROUSEL_ALBUM") && result.listMetadata?keys?seq_contains("instagramMediaUrl")>
              <img class="card-img img-fluid" alt="Instagram Media Image" src="${result.listMetadata["instagramMediaUrl"]?first}">
            </#if>
            <#if (result.listMetadata["instagramMediaType"]?first!"") == "VIDEO" && result.listMetadata?keys?seq_contains("instagramThumbnailUrl")>
              <img class="card-img img-fluid" alt="Instagram Video Thumbnail" src="${result.listMetadata["instagramThumbnailUrl"]?first}">
            </#if>
          </a>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <div class="card-text">
              <strong>${result.listMetadata["author"]?first!"Unknown"}</strong>&nbsp;
              <@s.boldicize><@s.Truncate length=500>${result.listMetadata["instagramCaption"]?first!}</@s.Truncate></@s.boldicize>
            </div>
            <div class="community-details">

              <#-- Like and comment count is only available in Graph API, not Basic Display API  -->
              <#-- Graph API requires more permissions to be approved in App Review -->
              <#if result.listMetadata?keys?seq_contains("instagramLikesCount")>
                <i class="fa fa-heart"></i><span>  ${result.listMetadata["instagramLikesCount"]?first}</span>
              </#if>
              <#if result.listMetadata?keys?seq_contains("instagramCommentsCount")>
                <i class="fa fa-comment"></i><span>  ${result.listMetadata["instagramCommentsCount"]?first}</span>
              </#if>

              <span>
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
