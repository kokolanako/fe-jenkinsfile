pipeline {
  agent {

    docker{
      image 'node:12.19-alpine'
      args '-p 3000:3000'
    }
    environment{
      CI ='true'
    }
  }
  // triggers {
  //   githubPush() //for DSL
  // }
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
        git branch: 'master', url: 'https://github.com/kokolanako/fe-jenkinsfile.git'
      }
      stage('Build'){
        steps{
          sh 'npm install'
        }
      }
    }
   
  }
}
