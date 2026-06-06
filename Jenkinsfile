pipeline {
    agent any

    stages {
        stage('Check Environment') {
            steps {
                sh 'pwd'
                sh 'whoami'
                sh 'which docker || echo "Docker not installed"'
                sh 'docker --version || true'
            }
        }
    }
}
