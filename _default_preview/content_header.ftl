<#ftl encoding="utf-8" output_format="HTML" />

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#top-nav" aria-expanded="false" aria-label="Toggle navigation">
    <small class="navbar-toggler-icon"></small>
  </button>
  <h1 class="sr-only">Toolbar</h1>

  <div class="collapse navbar-collapse navbar-light bg-light" id="top-nav">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item"><a class="nav-link text-secondary" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#">Jobs</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#">Newsroom</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#">Giving to FBU</a></li>
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link text-secondary" href="#"><span class="fa fa-graduation-cap"></span> Alumni</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#"><span class="fa fa-users"></span> My FBU</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#"><span class="fa fa-book"></span> Library</a></li>
        <li class="nav-item"><a class="nav-link text-secondary" href="#"><span class="fa fa-search"></span><span class="sr-only">Search</span></a></li>
    </ul>
  </div>
</nav>

<nav class="navbar navbar-light navbar-expand-md customer">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav" aria-expanded="false" aria-label="Toggle navigation">
    <small class="navbar-toggler-icon"></small>
  </button>
  <h1 class="sr-only">Main menu</h1>
  <div class="container">
    <div class="collapse navbar-collapse" id="main-nav">
      <a class="navbar-brand" href="#">
        <img src="${ContextPath}/resources/${question.collection.id}/${question.profile}/img/brand.png" alt="Funnelback University">
      </a>
      <ul class="navbar-nav">
        <li class="nav-item customer-study"><a class="nav-link" href="#">Study at FBU</a></li>
        <li class="nav-item customer-research"><a class="nav-link" href="#">Research &amp; Innovation</a></li>
        <li class="nav-item customer-community"><a class="nav-link" href="#">Industry &amp; Community</a></li>
      </ul>
    </div>
  </div>
</nav>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
