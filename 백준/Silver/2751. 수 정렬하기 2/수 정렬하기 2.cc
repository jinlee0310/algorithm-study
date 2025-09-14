#include <iostream>

using namespace std;

int arr[10000001];
int temp[10000001];

void merge(int st,int en){
    int mid=(st+en)/2;
    int lidx=st;
    int ridx=mid;
    for(int i=st;i<en;i++){
        if(ridx==en) temp[i]=arr[lidx++];
        else if(lidx==mid) temp[i]=arr[ridx++];
        else if(arr[lidx]<=arr[ridx]) temp[i]=arr[lidx++];
        else temp[i]=arr[ridx++];
    }

    for(int i=st;i<en;i++) arr[i]=temp[i];
}

void merge_sort(int st,int en){
     if(en-st == 1) return; 

    int mid=(st+en)/2;
    merge_sort(st,mid);
    merge_sort(mid,en);
    merge(st,en);
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;


  for(int i = 0; i < N; i++) cin >> arr[i];

    merge_sort(0,N);

  for(int i = 0; i < N; i++) cout << arr[i] << '\n';


}