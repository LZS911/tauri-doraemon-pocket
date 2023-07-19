import axios from 'axios';

class GitHub {
  public getBranch(
    repo: string,
    branch: string,
    token?: string,
    owner = 'actiontech'
  ) {
    return axios.get(
      `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default new GitHub();
