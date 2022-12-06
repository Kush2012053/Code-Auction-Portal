//const url = "https://code-auction-backend.herokuapp.com/";
//const url = "https://code-auction-test.up.railway.app/";
//const url = "https://code-auction-backend.up.railway.app/";
const url = "http://35.154.96.3:8000/";
const Api = {
  login: url + "auth/login/",
  allquestion: url + "auction/question/",
  transaction: url + "transactions",
  loginteam: url + "team",
  solve: url + "team/assignedQuestions",
  language: url + "contest/languages",
  submit: url + "contest/submitAnswer/",
  leaderboard: url + "leaderboard",
  assign: url + "team/assignedQuestion/",
};

export default Api;
