<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li data-fb-result="${result.indexUrl}" class="search-result search-result-course mb-3">
    <div class="card">

      <div class="card-header cart-item-trigger-parent">
        <h4>
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
            <@s.boldicize><@s.Truncate length=70>${result.title}</@s.Truncate></@s.boldicize>
          </a>
          <#if result.metaData["courseSubject"]?? && result.metaData["courseNumber"]??>
            <small class="text-muted">(${result.metaData["courseSubject"]!}-${result.metaData["courseNumber"]!})</small>
          </#if>
        </h4>
        <div class="card-subtitle text-muted">
          ${result.metaData["courseDepartment"]!}
        </div>
        <@history_cart.LastVisitedLink result=result/>
      </div>

      <div class="card-body">
        <div class="card-text">
          <#if result.metaData["image"]??>
            <img class="img-fluid float-right ml-3" alt="Thumbnail for ${result.title}" src="${result.listMetadata["image"][0]}">
          </#if>

          <#if result.metaData["courseDesc"]??>
            <@s.boldicize>${result.metaData["courseDesc"]?no_esc}</@s.boldicize>
          </#if>
        </div>

        <div class="row mt-3">
          <div class="col-md-4">
            <h5>Credits</h5>
            <#if result.metaData["courseCredit"]??>
              <span>${result.listMetadata["courseCredit"]?join(", ")}</span>
            <#else>
              <span>-</span>
            </#if>
          </div>

          <div class="col-md-4">
            <h5>Term</h5>
            <#if result.metaData["courseTerm"]??>
              <span>${result.listMetadata["courseTerm"]?join(", ")}</span>
            <#else>
              <span>-</span>
            </#if>
          </div>

          <div class="col-md-4">
            <h5>Delivery</h5>
            <#if result.metaData["courseDelivery"]??>
              <span>${result.listMetadata["courseDelivery"]?join(", ")}</span>
            <#else>
              <span>-</span>
            </#if>
          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>

<#macro CartTemplate>
  <script id="cart-template-higher-education-courses" type="text/x-handlebar-template">
    <div class="card search-result-course">

      <div class="card-header cart-item-trigger-parent">

        <h4>
          <a href="{{indexUrl}}">
            {{title}}
          </a>
          <small class="text-muted">({{metaData.courseSubject}}-{{metaData.courseNumber}})</small>
        </h4>
        <div class="card-subtitle text-muted">
          {{metaData.courseDepartment}}
        </div>
      </div>

      <div class="card-body">
        <div class="card-text">
          {{#if metaData.image}}<img class="img-fluid float-right" alt="{{result.title}}" src="{{metaData.image}}">{{/if}}

          {{metaData.courseDesc}}
        </div>

        <div class="row mt-3">
          <div class="col-md-4">
            <h5>Credits</h5>
            <span>{{#if metaData.courseCredit}}{{metaData.courseCredit}}{{else}}-{{/if}}</span>
          </div>

          <div class="col-md-4">
            <h5>Term</h5>
            <span>{{#if metaData.courseTerm}}{{metaData.courseTerm}}{{else}}-{{/if}}</span>
          </div>

          <div class="col-md-4">
            <h5>Delivery</h5>
            <span>{{#if metaData.courseDelivery}}{{metaData.courseDelivery}}{{else}}-{{/if}}</span>
          </div>
        </div>

      </div>
    </div>
  </script>
</#macro>

<#macro AutoCompleteTemplate>
  <script id="auto-completion-courses" type="text/x-handlebar-template">
    <div>
      <h6>{{extra.disp.title}} <small class="text-muted">{{extra.disp.metaData.courseSubject}}-{{extra.disp.metaData.courseNumber}}</small></h6>
      <div class="details">
        <small>{{extra.disp.metaData.courseTerm}}</small>
      </div>
    </div>
  </script>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
