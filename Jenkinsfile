pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/mugenryuu/cypress-test-personal.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'xvfb-run -a npx cypress run --browser electron --headless'
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SCANNER_HOME = tool 'sonar-scanner'
                SONAR_TOKEN = credentials('sonarqube-token')
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    npx sonar-scanner \
                        -Dsonar.projectKey=cypress-test-personal \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://193e9830f5f6.ngrok-free.app \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
