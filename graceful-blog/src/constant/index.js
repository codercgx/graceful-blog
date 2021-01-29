export const upload_avatar_url= '/upload/pic/avatar'

/**
 * github ¿ªÔ´api
 * 
 */
import axios from 'axios'

export const github_base_url='https://api.github.com'

export const github_getUserInfo= '/users/'
// export const github_user_repos='/users/codercgx/repos'

const github_request=axios.create({
    baseURL: github_base_url
})

export const githubUserInfo=(username)=>{
    return github_request.get(github_getUserInfo+username)
}


export const githubUserRepos=(username)=>{
    return github_request.get(`${github_getUserInfo}${username}/repos`)
}

export const githubReposDetail=(username,reposName)=>{
    return github_request.get(`repos/${username}/${reposName}`)
}

