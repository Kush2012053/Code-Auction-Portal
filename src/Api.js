const url = "https://code-auction-backend.herokuapp.com/";
const Api = {
  login: url + "auth/login/",
  allquestion: url + "auction/question/",
  transaction: url + "transactions",
  loginteam: url + "team",
  solve: url + "team/assignedQuestions",
};

export default Api;
