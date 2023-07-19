import axios from 'axios';

class Gitlab {
  // private token = 'glpat-zWHYTKxthoBWPhGnXNYT';

  public getAllBranches(
    projectId: number,
    token: string,
    url: string,
    search?: string
  ) {
    return axios.get(
      `${url}/api/v4/projects/${projectId}/repository/branches`,
      {
        headers: {
          'PRIVATE-TOKEN': token,
        },
        params: {
          search,
          per_page: 100,
        },
      }
    );
  }
}

export default new Gitlab();
