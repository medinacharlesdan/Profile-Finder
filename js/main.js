$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;

        // Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '85e76c95ac449acda410',
                client_secret: '3569c039db3917896a90835b6c88d769164a5094'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '85e76c95ac449acda410',
                    client_secret: '3569c039db3917896a90835b6c88d769164a5094',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
          
                <div class="col col-md-4 col-sm-12">    
                <div class="card text-white bg-primary mb-3 " style="max-width: 20rem;">
                <div class="card-header">${repo.name}</div>
                <div class="card-body text-primary">
                    <h4 class="card-title text-white">${repo.name}</h4>
                    <h5 class="text-muted text-truncate">${repo.description}</h5>
                    <p class="card-text">
                        <span class="badge badge-info">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                    </p>
                    <a href="${repo.html_url}" target="_blank" class="text-white">Repo Page</a>
                </div>
                </div>
          
          `);
                });
            });

         $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="badge badge-warning">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <div class="container">
          
                <h2>Bio: <p class="text-muted"> ${user.bio} </p></h2>
                <p>Company: ${user.company}</p>
                <p>Website/blog: ${user.blog}</p>
                <p>Location: ${user.location}</p>
                <p">Member Since: ${user.created_at}</p>
              
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header my-2">Latest Repositories</h3>
        <div id="repos" class="row justify-content-md-center"></div>
      `);
        });
    });
});
