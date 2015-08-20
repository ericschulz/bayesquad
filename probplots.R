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
b1<-seq(min(y1),max(y1),l=12)

y2<-rpois(1000, 8)
b2<-seq(min(y2),max(y2),l=12)



y3<-dicegeom(1000)
b3<-seq(min(y3),max(y3),l=12)

y4<-gamebimodal(1000)
b4<-seq(min(y4),max(y4),l=12)

getwd()

pdf("probdists.pdf")
par(oma=c(0,0,2,0))
par(mfrow=c(2,2))
hist(y1, xlab="Height", ylab="Counts", breaks=b1, main=expression("Height: Normal"~mu==169~","~sigma^2==10), col="grey")
hist(y2, xlab="Number", ylab="Counts", breaks=b2, main=expression("Emails: Poisson"~lambda==8), col="grey")
hist(y3, xlab="Throws", ylab="Counts", breaks=b3, main=expression("Dice: Geometric"~p==1/6), col="grey")
hist(y4, xlab="Score", ylab="Counts", breaks=b4, main=expression("Game: Bim"~mu==6/10~","~sigma^2==0.7/0.5), col="grey")
title("Probability Distributions", outer=TRUE, cex=5)
dev.off()
