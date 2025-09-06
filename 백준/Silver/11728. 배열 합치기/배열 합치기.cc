#include <iostream>
using namespace std;

int main()
{
    int N,M;
    cin >> N >> M;

    int a[N],b[M],c[N+M];

    for(int i=0;i<N;i++) cin >> a[i];
    for(int i=0;i<M;i++) cin >> b[i];

    int aidx=0;
    int bidx=0;
    for(int i=0;i<N+M;i++){
        if(aidx==N){
            c[i]=b[bidx];
            bidx++;
        }else if(bidx==M){
            c[i]=a[aidx];
            aidx++;
        }else if(a[aidx]<=b[bidx]){
            c[i]=a[aidx];
            aidx++;
        }else{
            c[i]=b[bidx];
            bidx++;
        }
    }
    for(int i=0;i<N+M;i++) cout << c[i] << " ";
    return 0;
}