pipeline {
    agent any

    environment {
        APP_NAME = 'Laundry'
    }

    stages {

        stage('Build Info') {
            steps {
                echo "Building ${APP_NAME}"
                sh 'git rev-parse --short HEAD'
            }
        }

        stage('Install Client') {
            steps {
                dir('client') {
                    retry(3) {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Build Client') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }

            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Frontend') {
            steps {
                archiveArtifacts artifacts: 'client/dist/**', fingerprint: true
            }
        }

        stage('Install Server') {
            steps {
                dir('server') {
                    retry(3) {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Test Server') {
            steps {
                dir('server') {
                    sh 'npm test'
                }
            }
        }

        stage('Security Scan') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'exit 1'
                }
            }
        }

        stage('Deploy') {
            when {
                expression {
                    currentBuild.currentResult == 'SUCCESS'
                }
            }

            steps {
                echo 'Deploying...'
            }
        }
    }

    post {
        success {
            echo 'Deploy successful'
        }

        failure {
            echo 'Notify team'
        }

        always {
            echo 'Cleanup workspace'
        }
    }
}
