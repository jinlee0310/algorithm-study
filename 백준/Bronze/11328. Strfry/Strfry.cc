#include <iostream>
#include <string>

using namespace std;

int main()
{
    int T;
    cin >> T;

    while(T){
        T--;
        string str1,str2;
        cin >> str1 >> str2;
        int arr[26]={0,};
        for(char c:str1){
            arr[c-'a']++;
        }
        for(char c:str2){
            arr[c-'a']--;
        }
        bool flag=false;
        for(int i=0;i<26;i++){
            if(arr[i]!=0){
                flag=true;
                break;
            }
        }
        if(flag){
            cout << "Impossible" << "\n";
        }else{
            cout << "Possible" << "\n";
        }
    }
}