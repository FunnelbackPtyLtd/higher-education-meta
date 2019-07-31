<#ftl encoding="utf-8" output_format="HTML" />

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="container">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav mr-auto">
                <a class="nav-item nav-link" href="#">About</a>
                <a class="nav-item nav-link" href="#">Jobs</a>
                <a class="nav-item nav-link" href="#">Newsroom</a>
                <a class="nav-item nav-link" href="#">Giving to FBU</a>
            </div>
            <div class="navbar-nav">
                <a class="nav-item nav-link" href="#"><span class="fa fa-graduation-cap"></span> Alumni</a>
                <a class="nav-item nav-link" href="#"><span class="fa fa-users"></span> My FBU</a>
                <a class="nav-item nav-link" href="#"><span class="fa fa-book"></span> Library</a>
                <a class="nav-item nav-link" href="#"><span class="fa fa-search"></span>Search</a>
            </div>
        </div>
  </div>
</nav>

<nav class="navbar navbar-dark navbar-expand-md customer">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav" aria-expanded="false" aria-label="Toggle navigation">
    <small class="navbar-toggler-icon"></small>
  </button>
  <h1 class="sr-only">Main menu</h1>
  <div class="container">
    
      <a class="navbar-brand" href="#">
        <img src="${ContextPath}/resources/${question.collection.id}/${question.profile}/img/brand.png" alt="Funnelback University">
      </a>
    <div class="collapse navbar-collapse" id="main-nav">
      <ul class="navbar-nav">
        <li class="nav-item customer-study"><a class="nav-link" href="#">Study at FBU</a></li>
        <li class="nav-item customer-research"><a class="nav-link" href="#">Research &amp; Innovation</a></li>
        <li class="nav-item customer-community"><a class="nav-link" href="#">Industry &amp; Community</a></li>
      </ul>
    </div>
  </div>
</nav>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
