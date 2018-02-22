<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li data-fb-result="${result.indexUrl}" class="search-result search-result-course">
    <div class="card">

      <div class="card-header">
        <#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
          <a href="javascript:;" class="btn btn-light border border-secondary float-right ng-cloak" data-ng-click="toggle()" data-cart-link data-css="star-o|star" data-labels="Add to shortlist|Remove" title="{{label}}">
            <span class="fa fa-{{css}}"></span>
            <span class="ng-cloak">{{label}}</span>
          </a>
        </#if>
        <h4>
          <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
            <@s.boldicize><@s.Truncate length=70>${result.title}</@s.Truncate></@s.boldicize>
          </a>
          <#if result.metaData["stencilsCourseSubject"]?? && result.metaData["stencilsCourseNumber"]??>
            <small class="text-muted">(${result.metaData["stencilsCourseSubject"]!}-${result.metaData["stencilsCourseNumber"]!})</small>
          </#if>
        </h4>
        <div class="card-subtitle text-muted">
          <#if result.metaData["stencilsCourseDepartment"]??>
            ${result.metaData["stencilsCourseDepartment"]}
          </#if>
          <@history_cart.LastVisitedLink result=result/>
        </div>
      </div>

      <div class="card-body">
        <div class="card-text">
          <#if result.metaData["I"]??>
            <img class="img-fluid float-right" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["I"]! />">
          </#if>

          <#if result.metaData["stencilsCourseDesc"]??>
            <@s.boldicize>${result.metaData["stencilsCourseDesc"]?no_esc}</@s.boldicize>
          </#if>
        </div>

        <div class="row">
          <div class="col-md-4">
            <h5>Credits</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["stencilsCourseCredit"]!"-" /></span>
          </div>

          <div class="col-md-4">
            <h5>Term</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["stencilsCourseTerm"]!"-" /></span>
          </div>

          <div class="col-md-4">
            <h5>Delivery</h5>
            <span><@base.MultiValuedMetadataDisplay metadata=result.metaData["stencilsCourseDelivery"]!"-" /></span>
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
        <span class="fa fa-times"></span>
        <span class="ng-cloak">Remove</span>
      </a>

      <h4>
        <a data-ng-href="{{item.indexUrl}}">
          {{item.title}}
        </a>
          <small data-ng-show="item.metaData.stencilsCourseSubject && item.metaData.stencilsCourseNumber" class="text-muted">({{item.metaData.stencilsCourseSubject}}-{{item.metaData.stencilsCourseNumber}})</small>
      </h4>
      <div class="card-subtitle text-muted">
        {{item.metaData.stencilsCourseDepartment}}
      </div>
    </div>

    <div class="card-body">
      <div class="card-text">
        <img data-ng-show="item.metaData.I" class="img-fluid float-right ng-cloak" alt="Thumbnail for {{result.title}}" data-ng-src="{{item.metaData.I}}">

        {{item.metaData.stencilsCourseDesc}}
      </div>

      <div class="row">
        <div class="col-md-4">
          <h5>Credits</h5>
          <span>{{item.metaData.stencilsCourseCredit || '-'}}</span>
        </div>

        <div class="col-md-4">
          <h5>Term</h5>
          <span>{{item.metaData.stencilsCourseTerm.replace('|', ', ').replace('|', ', ') || '-'}}</span>
        </div>

        <div class="col-md-4">
          <h5>Delivery</h5>
          <span>{{item.metaData.stencilsCourseDelivery.replace('|', ', ') || '-'}}</span>
        </div>
      </div>

    </div>
  </div>
</#macro>

<#macro AutoCompleteTemplate>
  <script id="auto-completion-courses" type="text/x-handlebar-template">
    <div>
      <h6>{{extra.disp.title}} <small class="text-muted">{{extra.disp.metaData.stencilsCourseSubject}}-{{extra.disp.metaData.stencilsCourseNumber}}</small></h6>
      <div class="details">
        <small>{{extra.disp.metaData.stencilsCourseTerm}}</small>
      </div>
    </div>
  </script>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
