#include <iostream>
#include <queue>
#include <string>

using namespace std;

int N,M;

int graph[101][101];
int visited[101][101]={0,};

int dr[4]={0,0,1,-1};
int dc[4]={1,-1,0,0};

void bfs()
{
    queue <pair<int,int>> q;
    q.push({0,0});

    while(q.size()){
        pair<int,int> cur=q.front();
        q.pop();

        for(int i=0;i<4;i++){
            int nr=cur.first+dr[i];
            int nc=cur.second+dc[i];

            if(0<=nr && nr<N && 0<=nc && nc<M && visited[nr][nc]==0 && graph[nr][nc]==1){
                visited[nr][nc]=visited[cur.first][cur.second]+1;
                q.push({nr,nc});
            }
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> N >> M;


    for (int i=0; i<N; ++i){
        string row;          
        cin >> row;

        for (int j=0; j<M; ++j){   
            graph[i][j] = row[j]-'0';   
        }
    }

    bfs();
    cout << visited[N-1][M-1]+1 << "\n";
    return 0;
}