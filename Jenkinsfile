pipeline {
  agent any
  triggers {
    githubPush()
  }
  // tools{
  //   nodejs "node"
  // }
 
  stages {
    stage('Hello'){
      steps{

      echo 'HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'
      }
    }
    stage('Cloning Git'){
      steps{
        git branch 'master', url: 'https://github.com/kokolanako/fe-jenkinsfile.git'
      }
    }
    // stage('Install dependencies'){
    //   sh 'npm install'
    // }
    // stage('Test'){
    //   steps{
    //     sh 'npm test'
    //   }
    // }
   
  }
}
