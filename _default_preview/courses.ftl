<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li data-fb-result="${result.indexUrl}" class="search-result search-result-course mb-3">
    <div class="card">

      <div class="card-header">
        <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
          <a href="javascript:;" class="btn btn-light border border-secondary float-right ng-cloak" data-ng-click="toggle()" data-cart-link data-css="far fa-star|fas fa-star" data-labels="Add to shortlist|Remove" title="{{label}}">
            <span class="{{css}}"></span>
            <span class="ng-cloak">{{label}}</span>
          </a>
        </#if>
        <h4>
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
            <@s.boldicize><@s.Truncate length=70>${result.title}</@s.Truncate></@s.boldicize>
          </a>
          <#if result.metaData["courseSubject"]?? && result.metaData["courseNumber"]??>
            <small class="text-muted">(${result.metaData["courseSubject"]!}-${result.metaData["courseNumber"]!})</small>
          </#if>
        </h4>
        <div class="card-subtitle text-muted">
          <#if result.metaData["courseDepartment"]??>
            ${result.metaData["courseDepartment"]}
          </#if>
          <@history_cart.LastVisitedLink result=result/>
        </div>
      </div>

      <div class="card-body">
        <div class="card-text">
          <#if result.metaData["image"]??>
            <img class="img-fluid float-right ml-3" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["image"]! />">
          </#if>

          <#if result.metaData["courseDesc"]??>
            <@s.boldicize>${result.metaData["courseDesc"]?no_esc}</@s.boldicize>
          </#if>
        </div>

        <div class="row mt-3">
          <div class="col-md-4">
            <h5>Credits</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["courseCredit"]!"-" /></span>
          </div>

          <div class="col-md-4">
            <h5>Term</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["courseTerm"]!"-" /></span>
          </div>

          <div class="col-md-4">
            <h5>Delivery</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["courseDelivery"]!"-" /></span>
          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>

<#macro ShortListTemplate>
  <div class="card search-result-course">

    <div class="card-header">
      <a href="javascript:;" class="btn btn-light border border-secondary float-right ng-cloak" data-ng-click="remove(item.indexUrl)">
        <span class="fas fa-times"></span>
        <span class="ng-cloak">Remove</span>
      </a>

      <h4>
        <a data-ng-href="{{item.indexUrl}}">
          {{item.title}}
        </a>
          <small data-ng-show="item.metaData.courseSubject && item.metaData.courseNumber" class="text-muted">({{item.metaData.courseSubject}}-{{item.metaData.courseNumber}})</small>
      </h4>
      <div class="card-subtitle text-muted">
        {{item.metaData.courseDepartment}}
      </div>
    </div>

    <div class="card-body">
      <div class="card-text">
        <img data-ng-show="item.metaData.I" class="img-fluid float-right ng-cloak" alt="Thumbnail for {{result.title}}" data-ng-src="{{item.metaData.I}}">

        {{item.metaData.courseDesc}}
      </div>

      <div class="row mt-3">
        <div class="col-md-4">
          <h5>Credits</h5>
          <span>{{item.metaData.courseCredit || '-'}}</span>
        </div>

        <div class="col-md-4">
          <h5>Term</h5>
          <span>{{item.metaData.courseTerm.replace('|', ', ').replace('|', ', ') || '-'}}</span>
        </div>

        <div class="col-md-4">
          <h5>Delivery</h5>
          <span>{{item.metaData.courseDelivery.replace('|', ', ') || '-'}}</span>
        </div>
      </div>

    </div>
  </div>
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
