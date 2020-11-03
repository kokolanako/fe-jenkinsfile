pipeline {
  agent any
  tools{
    nodejs "node"
  }
 
  stages {
    stage('Cloning Git'){
      steps{
        git 'https://github.com/kokolanako/fe-jenkinsfile.git'
      }
    }
    stage('Install dependencies'){
      sh 'npm install'
    }
    stage('Test'){
      steps{
        sh 'npm test'
      }
    }
   
  }
}
