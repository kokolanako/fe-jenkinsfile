pipeline {
  agent any
  // {

  //   docker{
  //     image 'node:12.19-alpine'
  //     args '-p 3000:3000'
  //   }
  // }
    environment{
      CI ='true'
  }
  // triggers {
  //   githubPush() //for DSL
  // }
  // tools{
  //   nodejs "node"
  // }
 
  stages {
   
    stage('Cloning Git Frontend'){
      steps{
        git branch: 'master', url: 'https://github.com/kokolanako/fe-jenkinsfile.git'
      }
      }
      stage('Build'){ 
        steps{
          
          sh 'npm run build'
        }
        stage('Create docker image'){
          agent{
            docker{
              image 'nginx:1.15.8-alpine'

            }
          }
          steps{

            sh 'cd /var/jenkins_home/workspace/fe-1/dist/energy-consumption-ui/'
            sh 'docker -t ui-image .'
          }
        }
    }
   
  }
}
