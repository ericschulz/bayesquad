rm(list=ls())

packages <- c('plyr', 'ggplot2', 'jsonlite', 'MASS', 'MCMCpack', 'plyr', 'rjags', 'fields', 'nnet')
lapply(packages, require, character.only = TRUE)
myjson<-fromJSON("https://myexample.firebaseio.com/.json")

dicegeom<-function(n){
  outcome<-rep(0,n)
  for (i in 1:n){
    throw<-0
    track<-0
    while(throw!=6){
      throw<-sample(1:6,1)
      track<-track+1
    }
    outcome[i]<-track
  }
  return(outcome)
}

gamebimodal<-function(n){
  outcome<-rep(0,n)
  for (i in 1:n){
    outcome[i]<-ifelse(runif(1)>0.5,rnorm(1,6,0.7),rnorm(1,10,0.5))
  }
  return(outcome)
}

#############################################################################################################

y1<-rnorm(1000, 169, 10)
y2<-rpois(1000, 8)
y3<-dicegeom(1000)
y4<-gamebimodal(1000)
i<-1
hprior<-hposterior<-eprior<-eposterior<-dprior<-dposterior<-gprior<-gposterior<-numeric()
for (i in 1:length(myjson)){
  dat<-myjson[[i]]
  hprior[i]<-abs(as.numeric(dat$heightprior)-sum(ifelse(dat$height>y1,1,0)))
  hposterior[i]<-abs(as.numeric(dat$heightposterior)-sum(ifelse(dat$height>y1,1,0)))
  eprior[i]<-abs(as.numeric(dat$emailprior)-sum(ifelse(dat$email>y2,1,0)))
  eposterior[i]<-abs(as.numeric(dat$emailposterior)-sum(ifelse(dat$email>y2,1,0)))
  dprior[i]<-abs(as.numeric(dat$diceprior)-sum(ifelse(dat$dice>y3,1,0)))
  dposterior[i]<-abs(as.numeric(dat$diceposterior)-sum(ifelse(dat$dice>y3,1,0)))
  gprior[i]<-abs(as.numeric(dat$gameprior)-sum(ifelse(dat$game>y4,1,0)))
  gposterior[i]<-abs(as.numeric(dat$gameposterior)-sum(ifelse(dat$game>y4,1,0)))
  
}

t.test(hprior,hposterior)
t.test(eprior,eposterior)
t.test(dprior,dposterior)
t.test(gprior,gposterior)

pdf("valuedistance.pdf")
par(oma=c(0,0,2,0))
par(mfrow=c(2,2))
plot(as.factor(rep(c("prior","posterior"), each=49)), c(hprior,hposterior), pch="" , col="grey", main="Height")
plot(as.factor(rep(c("prior","posterior"), each=49)), c(eprior,eposterior), pch="", col="grey",  main="Email")
plot(as.factor(rep(c("prior","posterior"), each=49)), c(dprior,dposterior), pch="", col="grey",  main="Dice")
plot(as.factor(rep(c("prior","posterior"), each=49)), c(gprior,gposterior), pch="", col="grey",  main="Game")
title("Distance to truth", outer=TRUE, cex=5)
dev.off()
